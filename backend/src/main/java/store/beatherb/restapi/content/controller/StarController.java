package store.beatherb.restapi.content.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import store.beatherb.restapi.content.dto.request.StarRequest;
import store.beatherb.restapi.content.service.StarService;
import store.beatherb.restapi.global.auth.domain.LoginUser;
import store.beatherb.restapi.global.response.ApiResponse;
import store.beatherb.restapi.member.dto.MemberDTO;

@Slf4j
@RequestMapping("/content/star")
@RequiredArgsConstructor
@RestController
public class StarController {
    private final StarService starService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> starContent(@LoginUser MemberDTO memberDTO, @Valid  @RequestBody StarRequest starRequest) {
        starService.starContentService(memberDTO, starRequest);
        return ResponseEntity.ok(ApiResponse.successWithoutData());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<?>> removeStarContent(@LoginUser MemberDTO memberDTO, @Valid  @RequestBody StarRequest starRequest) {
        starService.removeStarContentService(memberDTO, starRequest);
        return ResponseEntity.ok(ApiResponse.successWithoutData());
    }
}
