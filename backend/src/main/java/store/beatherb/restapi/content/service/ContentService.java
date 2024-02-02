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
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.content.domain.ContentRepository;
import store.beatherb.restapi.content.dto.request.ContentUploadRequest;
import store.beatherb.restapi.content.exception.ContentErrorCode;
import store.beatherb.restapi.content.exception.ContentException;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ContentService {



    private final ContentRepository contentRepository;
    private final String CROPPED_DIRECTORY;

//    private final String REFERENCE_DIRECTORY;
//
//    private final String FFMPEG_LOCATION;
//    private final String FFPROBE_LOCATION;

    public ContentService(ContentRepository contentRepository, @Value("${resource.directory.music.cropped}")String CROPPED_DIRECTORY,
                          @Value("${resource.directory.music.reference}") String REFERENCE_DIRECTORY
//                          @Value("${ffmpeg.directory.ffmpeg}") String FFMPEG_LOCATION,
//                          @Value("${ffmpeg.directory.ffprobe}") String FFPROBE_LOCATION
                          ) {
        this.contentRepository = contentRepository;
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

    public void uploadContent(ContentUploadRequest request){



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
