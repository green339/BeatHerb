package store.beatherb.restapi.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.auth.dto.oauth.KakaoUserAuthDto;
import store.beatherb.restapi.auth.dto.oauth.OIDCDto;
import store.beatherb.restapi.auth.dto.oauth.Provider;
import store.beatherb.restapi.auth.dto.request.AuthOAuthKakaoRequest;
import store.beatherb.restapi.auth.dto.request.AuthJoinRequest;
import store.beatherb.restapi.auth.dto.response.AuthVerifyTokenResponse;

import java.util.Base64;
import static store.beatherb.restapi.global.util.DecodeAuthUtil.payloadDecoder;

@Service
@Slf4j
@RequiredArgsConstructor
public class KakaoAuthService {
    @Value("${kakao.client_id}")
    private String clientId;
    @Value("${kakao.redirect_uri}")
    private String redirectUri;
    @Value("${kakao.auth_base_url}")
    private String authBaseUrl;

    private final AuthService authService;
    public AuthVerifyTokenResponse auth(AuthOAuthKakaoRequest authOAuthKakaoRequest){
        //1. access token refresh token id token 받아옴
        KakaoUserAuthDto kakaoUserAuthDto=userAuth(authOAuthKakaoRequest);
        log.info("id token 받아옴: "+kakaoUserAuthDto.getIdToken());
        //2. id 토큰 이용해서 이메일/식별자 받아옴
        AuthJoinRequest authJoinRequest =userInfo(kakaoUserAuthDto);
        log.info("이메일 받아옴 "+authJoinRequest.getEmail());
        //회원가입, 로그인 로직으로 보내기
        authService.socialJoinLogin(authJoinRequest);
        //처리결과 보내기 (회원가입/로그인완료/에러)
        return null;
    }

    private AuthJoinRequest userInfo(KakaoUserAuthDto kakaoUserAuthDto){
        // JWT 토큰을 디코딩해서 ID, SUB값 가져오기
        String jwtPayload= kakaoUserAuthDto.getIdToken().split("\\.")[1];
        log.info("payload: "+jwtPayload);
        OIDCDto oidcDto= payloadDecoder(jwtPayload);
        return AuthJoinRequest
                .builder()
                .provider(Provider.KAKAO)
                .email(oidcDto.getEmail())
                .identifier("kakao "+oidcDto.getSub())
                .build();
    }

    private KakaoUserAuthDto userAuth(AuthOAuthKakaoRequest authOAuthKakaoRequest) {
        // webclient로 통신해서 access token, refresh token받아오기
        WebClient webClient=WebClient.builder()
                                    .baseUrl(authBaseUrl)
                                    .defaultHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                                    .build();

        MultiValueMap<String, String> formData=new LinkedMultiValueMap<>();
        formData.add("grant_type","authorization_code");
        formData.add("client_id",clientId);
        formData.add("redirect_uri",redirectUri);
        formData.add("code", authOAuthKakaoRequest.getCode());

        return webClient
                .post()
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(KakaoUserAuthDto.class)
                .block();
    }
}
