package store.beatherb.restapi.content.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.content.dto.request.ContentUploadRequest;
import store.beatherb.restapi.content.service.ContentService;
import store.beatherb.restapi.global.auth.domain.LoginUser;
import store.beatherb.restapi.global.response.ApiResponse;
import store.beatherb.restapi.member.dto.MemberDTO;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/content")
@Slf4j
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Content>>> contentsOrderByHit(){
        List<Content> response= contentService.getContentsOrderByHit();
        return ResponseEntity.ok(ApiResponse.successWithData(response));
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

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<?>> upload(@LoginUser(required = false) MemberDTO memberDTO, @Valid  @ModelAttribute  ContentUploadRequest contentUploadRequest){
        //TODO : 수정 필요!!!!!!!
        System.out.println(contentUploadRequest);
        contentService.uploadContent(memberDTO,contentUploadRequest);
        ApiResponse<ContentUploadRequest> response = ApiResponse.of(HttpStatus.CREATED,contentUploadRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
//    @GetMapping("/test")
//    public ResponseEntity<?> test(){
//        contentService.makeSequence();
//
//        return ResponseEntity.ok("good");
//    }

}
