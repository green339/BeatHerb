package store.beatherb.restapi.content.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import store.beatherb.restapi.content.service.ContentService;

@RestController
@RequestMapping("/api/content")
@Slf4j
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;

    @GetMapping
    public ResponseEntity contentsOrderByHit(){
        return ResponseEntity.ok(contentService.getContentsOrderByHit());
    }
}
