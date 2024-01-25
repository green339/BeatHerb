package store.beatherb.restapi.auth.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    public AuthVerifyTokenResponse join(AuthJoinRequest authJoinRequest){
        return authService.emailJoin(authJoinRequest);
    }

    @GetMapping("/oauth/kakao")
    public AuthVerifyTokenResponse KakaoOAuth(AuthOAuthKakaoRequest authOAuthKakaoRequest){
        return kakaoAuthService.auth(authOAuthKakaoRequest);
    }

    @GetMapping("/oauth/naver")
    public AuthVerifyTokenResponse NaverOAuth(AuthOAuthNaverRequest authOAuthNaverRequest){
        return naverAuthService.auth(authOAuthNaverRequest);
    }

    @GetMapping("/oauth/google")
    public AuthVerifyTokenResponse GoogleOAuth(AuthOAuthGoogleRequest authOAuthGoogleRequest){
        return googleAuthService.auth(authOAuthGoogleRequest);
    }
}
