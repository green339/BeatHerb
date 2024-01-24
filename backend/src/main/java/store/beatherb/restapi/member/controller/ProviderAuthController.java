package store.beatherb.restapi.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import store.beatherb.restapi.member.dto.request.GoogleAuthRequest;
import store.beatherb.restapi.member.dto.request.KakaoAuthRequest;
import store.beatherb.restapi.member.dto.request.NaverAuthRequest;
import store.beatherb.restapi.member.dto.response.TokenResponse;
import store.beatherb.restapi.member.service.GoogleAuthService;
import store.beatherb.restapi.member.service.KakaoAuthService;
import store.beatherb.restapi.member.service.NaverAuthService;

@RestController
@RequestMapping("/api/oauth")
@Slf4j
@RequiredArgsConstructor
public class ProviderAuthController {
    private final GoogleAuthService googleAuthService;
    private final KakaoAuthService kakaoAuthService;
    private final NaverAuthService naverAuthService;

    @GetMapping("/kakao")
    public TokenResponse KakaoAuth(KakaoAuthRequest kakaoAuthRequest){
        return kakaoAuthService.auth(kakaoAuthRequest);
    }

    @GetMapping("/naver")
    public TokenResponse NaverAuth(NaverAuthRequest naverAuthRequest){
        return naverAuthService.auth(naverAuthRequest);
    }

    @GetMapping("/google")
    public TokenResponse GoogleAuth(GoogleAuthRequest googleAuthRequest){
        return googleAuthService.auth(googleAuthRequest);
    }
}
