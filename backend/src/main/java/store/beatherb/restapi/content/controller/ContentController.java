package store.beatherb.restapi.content.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.content.service.ContentService;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/content")
@Slf4j
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;

    @GetMapping
    public ResponseEntity<List<Content>> contentsOrderByHit(){
        return ResponseEntity.ok(contentService.getContentsOrderByHit());
    }

    @GetMapping("/play/{contentNumber}")
    public ResponseEntity<Resource> getPlayListByContentNumber(@PathVariable Integer contentNumber) {
        Resource resource = contentService.getPlayList(contentNumber);
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment;");
        headers.setContentType(MediaType.parseMediaType("application/vnd.apple.mpegurl"));
        return new ResponseEntity<Resource>(resource, headers, HttpStatus.OK);
    }

    @GetMapping("/play/{contentNumber}/{segmentName:.+}")
    public ResponseEntity<Resource> getSegment(@PathVariable Integer contentNumber,@PathVariable String segmentName) {

        Resource resource = contentService.getSegmentByContentNumberAndSegmentName(contentNumber,segmentName);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

//    @GetMapping("/test")
//    public ResponseEntity<?> test(){
//        contentService.makeSequence();
//
//        return ResponseEntity.ok("good");
//    }

}
