package store.beatherb.restapi.content.service;

import lombok.extern.slf4j.Slf4j;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.domain.*;
import store.beatherb.restapi.content.dto.request.ContentUploadRequest;
import store.beatherb.restapi.content.exception.ContentErrorCode;
import store.beatherb.restapi.content.exception.ContentException;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.member.dto.MemberDTO;
import store.beatherb.restapi.member.exception.MemberErrorCode;
import store.beatherb.restapi.member.exception.MemberException;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
public class ContentService {



    private final ContentRepository contentRepository;
    private final String CROPPED_DIRECTORY;

    private final MemberRepository memberRepository;

    private final HashTagRepository hashTagRepository;

//    private final String REFERENCE_DIRECTORY;
//
//    private final String FFMPEG_LOCATION;
//    private final String FFPROBE_LOCATION;


    public ContentService(ContentRepository contentRepository,
                          MemberRepository memberRepository,
                          HashTagRepository hashTagRepository,
                          @Value("${resource.directory.music.cropped}")String CROPPED_DIRECTORY,
                          @Value("${resource.directory.music.reference}") String REFERENCE_DIRECTORY
//                          @Value("${ffmpeg.directory.ffmpeg}") String FFMPEG_LOCATION,
//                          @Value("${ffmpeg.directory.ffprobe}") String FFPROBE_LOCATION
                          ) {
        this.contentRepository = contentRepository;
        this.memberRepository = memberRepository;
        this.hashTagRepository = hashTagRepository;
        this.CROPPED_DIRECTORY = CROPPED_DIRECTORY;
//        this.REFERENCE_DIRECTORY = REFERENCE_DIRECTORY;
//        this.FFMPEG_LOCATION = FFMPEG_LOCATION;
//        this.FFPROBE_LOCATION = FFPROBE_LOCATION;
    }


    public List<Content> getContentsOrderByHit(){
        Optional<List<Content>> contentListOptional = contentRepository.findAllByOrderByHitDesc();
        return contentListOptional.orElseThrow(() -> new ContentException(ContentErrorCode.LIST_HAS_NOT_CONTENT));
    }

    public Resource getPlayList(Integer contentNumber){
        String fileFullPath = CROPPED_DIRECTORY +
                "/" +
                contentNumber +
                "/playlist.m3u8";

        Resource resource = new FileSystemResource(fileFullPath);
        if(resource.exists()){
            return resource;
        }
        throw new ContentException(ContentErrorCode.CONTENT_NOT_FOUND);
    }

    public Resource getSegmentByContentNumberAndSegmentName(Integer contentNumber, String segmentName){
        String fileFullPath = CROPPED_DIRECTORY + "/"+contentNumber+"/" + segmentName;
        Resource resource = new FileSystemResource(fileFullPath);
        if (resource.exists()) {
            return resource;
        }
        throw new ContentException(ContentErrorCode.CONTENT_NOT_FOUND);
    }

    public void uploadContent(MemberDTO memberDTO,ContentUploadRequest request){
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
        for (Long creatorId : creatorIds){ //창작가들을 찾을수 없으면 Throw
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


        for(Long hashTagId : hashTagsIds){
            HashTag hashTag = hashTagRepository.findById(hashTagId)
                    .orElseThrow(
                            ()-> {
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

        contentRepository.save(content);



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
