package store.beatherb.restapi.content.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import store.beatherb.restapi.content.dto.request.SearchRequest;
import store.beatherb.restapi.content.service.ContentSearchService;
import store.beatherb.restapi.global.response.ApiResponse;

@RestController
@RequestMapping("/api/content/search")
@Slf4j
@RequiredArgsConstructor
public class ContentSearchController {
    private final ContentSearchService contentSearchService;

    @GetMapping
    public ApiResponse<?> search(SearchRequest searchRequest){
        log.info("search");
        return ApiResponse.successWithData(contentSearchService.search(searchRequest));
    }

}
