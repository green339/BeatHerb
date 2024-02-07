package store.beatherb.restapi.content.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import store.beatherb.restapi.content.dto.request.ContentDetailRequest;
import store.beatherb.restapi.content.service.ContentDetailService;
import store.beatherb.restapi.global.response.ApiResponse;

@RestController
@RequestMapping("/api/content/detail")
@Slf4j
@RequiredArgsConstructor
public class ContentDetailController {
    private final ContentDetailService contentDetailService;

    @GetMapping
    public ApiResponse<?> contentDetail(ContentDetailRequest contentDetailRequest){     // by id
        return ApiResponse.successWithData(contentDetailService.detail(contentDetailRequest));
    }
}
