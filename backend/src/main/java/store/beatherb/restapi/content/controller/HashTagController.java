package store.beatherb.restapi.content.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import store.beatherb.restapi.content.domain.HashTagRepository;
import store.beatherb.restapi.content.dto.request.DeleteHashTagRequest;
import store.beatherb.restapi.content.dto.request.RegistHashTagRequest;
import store.beatherb.restapi.content.dto.request.UpdateHashTagRequest;
import store.beatherb.restapi.content.dto.respone.RegistHashTagResponse;
import store.beatherb.restapi.content.dto.respone.UpdateHashTagResponse;
import store.beatherb.restapi.content.service.HashTagService;
import store.beatherb.restapi.global.response.ApiResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/hashtag")
public class HashTagController {
    private final HashTagService hashTagService;

    @PostMapping
    public ResponseEntity<ApiResponse<RegistHashTagResponse>> registHashTag(@Valid @RequestBody RegistHashTagRequest registHashTagRequest){
        RegistHashTagResponse response = hashTagService.registHashTag(registHashTagRequest);
        ApiResponse<RegistHashTagResponse> apiResponse = ApiResponse.successWithData(response);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }

    @PutMapping
    public ResponseEntity<ApiResponse<UpdateHashTagResponse>> updateHashTag(@Valid @RequestBody UpdateHashTagRequest updateHashTagRequest){
        UpdateHashTagResponse response = hashTagService.updateHashTag(updateHashTagRequest);
        ApiResponse<UpdateHashTagResponse> apiResponse = ApiResponse.successWithData(response);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<?>> deleteHashTag(@Valid @RequestBody DeleteHashTagRequest deleteHashTagRequest){
        hashTagService.deleteHashTag(deleteHashTagRequest);
        ApiResponse<?> apiResponse = ApiResponse.successWithoutData();
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }
}
