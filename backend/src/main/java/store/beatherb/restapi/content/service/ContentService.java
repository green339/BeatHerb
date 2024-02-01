package store.beatherb.restapi.content.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.content.domain.ContentRepository;
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

    public ContentService(ContentRepository contentRepository, @Value("${resource.directory.music.cropped}")String CROPPED_DIRECTORY) {
        this.contentRepository = contentRepository;
        this.CROPPED_DIRECTORY = CROPPED_DIRECTORY;
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
}
