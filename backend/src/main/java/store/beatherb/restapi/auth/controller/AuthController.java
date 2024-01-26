package store.beatherb.restapi.auth.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import store.beatherb.restapi.auth.dto.request.AuthOAuthGoogleRequest;
import store.beatherb.restapi.auth.dto.request.AuthOAuthKakaoRequest;
import store.beatherb.restapi.auth.dto.request.AuthJoinRequest;
import store.beatherb.restapi.auth.dto.request.AuthOAuthNaverRequest;
import store.beatherb.restapi.auth.dto.response.AuthVerifyTokenResponse;
import store.beatherb.restapi.auth.service.GoogleAuthService;
import store.beatherb.restapi.auth.service.KakaoAuthService;
import store.beatherb.restapi.auth.service.AuthService;
import store.beatherb.restapi.auth.service.NaverAuthService;

@RestController
@RequestMapping("/api/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {
    private final GoogleAuthService googleAuthService;
    private final KakaoAuthService kakaoAuthService;
    private final NaverAuthService naverAuthService;
    private final AuthService authService;

    @PostMapping("/join")
    public AuthVerifyTokenResponse join(@RequestBody AuthJoinRequest authJoinRequest){
        return authService.emailJoin(authJoinRequest);
    }

    @PostMapping("/oauth/kakao")
    public AuthVerifyTokenResponse KakaoOAuth(@RequestBody AuthOAuthKakaoRequest authOAuthKakaoRequest){
        log.info("kakaoOAuth"+authOAuthKakaoRequest.getCode());
        return kakaoAuthService.auth(authOAuthKakaoRequest);
    }

    @PostMapping("/oauth/naver")
    public AuthVerifyTokenResponse NaverOAuth(@RequestBody AuthOAuthNaverRequest authOAuthNaverRequest){
        log.info(authOAuthNaverRequest.toString());
        log.info("naverOAuth "+authOAuthNaverRequest.getCode());
        return naverAuthService.auth(authOAuthNaverRequest);
    }

    @PostMapping("/oauth/google")
    public AuthVerifyTokenResponse GoogleOAuth(@RequestBody AuthOAuthGoogleRequest authOAuthGoogleRequest){
        return googleAuthService.auth(authOAuthGoogleRequest);
    }
}
