package store.beatherb.restapi.content.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import store.beatherb.restapi.content.domain.*;
import store.beatherb.restapi.content.dto.request.CreatorAgreeRequest;
import store.beatherb.restapi.content.dto.request.ContentUploadRequest;
import store.beatherb.restapi.content.dto.respone.ContentUploadRespone;
import store.beatherb.restapi.content.exception.ContentErrorCode;
import store.beatherb.restapi.content.exception.ContentException;
import store.beatherb.restapi.content.exception.CreatorErrorCode;
import store.beatherb.restapi.content.exception.CreatorException;
import store.beatherb.restapi.global.auth.exception.AuthErrorCode;
import store.beatherb.restapi.global.auth.exception.AuthException;
import store.beatherb.restapi.global.exception.BeatHerbErrorCode;
import store.beatherb.restapi.global.exception.BeatHerbException;
import store.beatherb.restapi.global.validate.MusicValid;
import store.beatherb.restapi.infrastructure.kafka.domain.dto.response.ContentUploadToKafkaResponse;
import store.beatherb.restapi.infrastructure.kafka.service.KafkaProducerService;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.member.dto.MemberDTO;
import store.beatherb.restapi.member.exception.MemberErrorCode;
import store.beatherb.restapi.member.exception.MemberException;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
public class ContentService {


    private final ContentRepository contentRepository;
    private final MemberRepository memberRepository;

    private final HashTagRepository hashTagRepository;

    private final CreatorRepository creatorRepository;

    private final KafkaProducerService kafkaProducerService;

    private final String CROPPED_DIRECTORY;
    private final String REFERENCE_DIRECTORY;


//
//    private final String FFMPEG_LOCATION;
//    private final String FFPROBE_LOCATION;


    public ContentService(ContentRepository contentRepository,
                          MemberRepository memberRepository,
                          HashTagRepository hashTagRepository,
                          KafkaProducerService kafkaProducerService,
                          CreatorRepository creatorRepository,
                          @Value("${resource.directory.music.cropped}") String CROPPED_DIRECTORY,
                          @Value("${resource.directory.music.reference}") String REFERENCE_DIRECTORY
//                          @Value("${ffmpeg.directory.ffmpeg}") String FFMPEG_LOCATION,
//                          @Value("${ffmpeg.directory.ffprobe}") String FFPROBE_LOCATION
    ) {
        this.contentRepository = contentRepository;
        this.memberRepository = memberRepository;
        this.hashTagRepository = hashTagRepository;
        this.creatorRepository = creatorRepository;
        this.kafkaProducerService = kafkaProducerService;
        this.CROPPED_DIRECTORY = CROPPED_DIRECTORY;
        this.REFERENCE_DIRECTORY = REFERENCE_DIRECTORY;
//        this.FFMPEG_LOCATION = FFMPEG_LOCATION;
//        this.FFPROBE_LOCATION = FFPROBE_LOCATION;
    }


    public List<Content> getContentsOrderByHit() {
        Optional<List<Content>> contentListOptional = contentRepository.findAllByOrderByHitDesc();
        return contentListOptional.orElseThrow(() -> new ContentException(ContentErrorCode.LIST_HAS_NOT_CONTENT));
    }

    public Resource getPlayList(Integer contentNumber) {
        String fileFullPath = CROPPED_DIRECTORY +
                "/" +
                contentNumber +
                "/playlist.m3u8";

        Resource resource = new FileSystemResource(fileFullPath);
        if (resource.exists()) {
            return resource;
        }
        throw new ContentException(ContentErrorCode.CONTENT_NOT_FOUND);
    }

    public Resource getSegmentByContentNumberAndSegmentName(Integer contentNumber, String segmentName) {
        String fileFullPath = CROPPED_DIRECTORY + "/" + contentNumber + "/" + segmentName;
        Resource resource = new FileSystemResource(fileFullPath);
        if (resource.exists()) {
            return resource;
        }
        throw new ContentException(ContentErrorCode.CONTENT_NOT_FOUND);
    }


    @Transactional
    public ContentUploadRespone uploadContent(MemberDTO memberDTO, ContentUploadRequest request) {
        if (!MusicValid.isMusicFile(request.getMusic())) {
            throw new ContentException(ContentErrorCode.MUSIC_NOT_VALID);
        }
        Member writer = memberRepository.findById(memberDTO.getId()).
                orElseThrow(
                        () -> {
                            return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                        }
                );
        Set<Long> creatorIds = request.getCreatorIds();
        Creator baseCreator = Creator.builder()
                .creator(writer)
                .agree(true)
                .build();
        List<Creator> creators = new ArrayList<>();
        creators.add(baseCreator);
        for (Long creatorId : creatorIds) { //창작가들을 찾을수 없으면 Throw
            Member member = memberRepository.findById(creatorId)
                    .orElseThrow(
                            () -> {
                                return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                            }
                    );
            creators.add(
                    Creator.builder()
                            .creator(member)
                            .agree(false)
                            .build()
            );
        }

        Set<Long> hashTagsIds = request.getHashTagIds();
        List<HashTag> hashTags = new ArrayList<>();


        for (Long hashTagId : hashTagsIds) {
            HashTag hashTag = hashTagRepository.findById(hashTagId)
                    .orElseThrow(
                            () -> {
                                return new ContentException(ContentErrorCode.HASHTAG_NOT_FOUND);
                            }
                    );
            hashTags.add(hashTag);
        }


        Content content = Content.builder()
                .hit(0)
                .describe(request.getDescribe())
                .title(request.getTitle())
                .lyrics(request.getLyrics())
                .creators(creators)
                .writer(writer)
                .hashTags(hashTags)
                .build();

        MultipartFile music = request.getMusic();

        String fileName = music.getOriginalFilename();

        String format = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
        log.info("Music File 확장자 : [{}]", format);

        contentRepository.save(content);

        String saveFileName = content.getId() + format;
        File file = new File(REFERENCE_DIRECTORY + File.separator + saveFileName);
        try {
            FileCopyUtils.copy(music.getBytes(), file);
        } catch (IOException e) {
            throw new BeatHerbException(BeatHerbErrorCode.INTERNAL_SERVER_ERROR);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            ContentUploadToKafkaResponse contentUploadToKafkaResponse = ContentUploadToKafkaResponse.builder()
                    .writerId(writer.getId())
                    .fileName(saveFileName)
                    .build();

            String contentUploadToKafkaResponseJson = objectMapper.writeValueAsString(contentUploadToKafkaResponse);
            kafkaProducerService.sendProcessingHls(contentUploadToKafkaResponseJson);


            //동의 비동의 처리

        } catch (JsonProcessingException e) {
            throw new BeatHerbException(BeatHerbErrorCode.INTERNAL_SERVER_ERROR);
        }

        return ContentUploadRespone.builder().id(content.getId()).build();

    }


    @Transactional
    public void contentAgreeAboutCreator(MemberDTO memberDTO, CreatorAgreeRequest creatorAgreeRequest) {

        Member member = memberRepository.findById(memberDTO.getId()).orElseThrow(
                () -> {
                    return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                }
        );

        Creator creator = creatorRepository.findById(creatorAgreeRequest.getId()).orElseThrow(
                () -> {
                    return new CreatorException(CreatorErrorCode.CREATOR_NOT_FOUND);
                }
        );

        if (creator.getCreator() != member) {
            throw new AuthException(AuthErrorCode.PERMISSION_DENIED);
        }
        if (creator.isAgree()) {
            throw new CreatorException(CreatorErrorCode.ALREADY_AGREE);
        }
        if (!creatorAgreeRequest.getAgree()) {
            creatorRepository.delete(creator);
        } else {
            creator.setAgree(true);
            creatorRepository.save(creator);
        }

    }


//    public void makeSequence(){ //너무 느려서 다른 녀석이 처리해줘야함 너무느림.
//
//        try {
//            FFprobe ffprobe = new FFprobe(FFPROBE_LOCATION);
//            FFmpeg ffmpeg = new FFmpeg(FFMPEG_LOCATION);
//            FFmpegBuilder builder = new FFmpegBuilder()
//                    .setInput(REFERENCE_DIRECTORY+"/1.mp3")
//                    .overrideOutputFiles(true)
//                    .addOutput(CROPPED_DIRECTORY + "/1/playlist.m3u8")
//                    .setAudioCodec("aac")
//                    .setAudioBitRate(192000)
//                    .setFormat("hls")
//                    .addExtraArgs("-hls_list_size", "0")
//                    .addExtraArgs("-hls_base_url", "1/")
//                    .addExtraArgs("-hls_time", "10")
//                    .addExtraArgs("-hls_segment_filename", CROPPED_DIRECTORY +"/1/%03d.aac")
//                    .done();
//
//            FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);
//            executor.createJob(builder).run();
//        }
//        catch (Exception e){
//            e.printStackTrace();
//        }
//
//    }
}
