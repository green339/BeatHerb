package store.beatherb.restapi.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.member.dto.KakaoUserAuthDto;
import store.beatherb.restapi.member.dto.ProviderAuthUserInfoDto;
import store.beatherb.restapi.member.dto.request.KakaoAuthRequest;
import store.beatherb.restapi.member.dto.response.TokenResponse;


@Service
@Slf4j
@RequiredArgsConstructor
public class KakaoAuthService {
    @Value("${kakao.client_id}")
    private String client_id;
    @Value("${kakao.redirect_uri}")
    private String redirect_uri;
    @Value("${kakao.base_uri}")
    private String base_uri;

    public TokenResponse auth(KakaoAuthRequest kakaoAuthRequest){
        //1. access token refresh token id token 받아옴
        KakaoUserAuthDto kakaoUserAuthDto=userAuth(kakaoAuthRequest);
        log.info(kakaoUserAuthDto.toString());
        //2. id 토큰 이용해서 이메일/식별자 받아옴
        ProviderAuthUserInfoDto providerAuthUserInfoDto=userInfo(kakaoUserAuthDto);
        return null;
    }

    private ProviderAuthUserInfoDto userInfo(KakaoUserAuthDto kakaoUserAuthDto) {
        // JWT 토큰을 디코딩해서 ID, SUTB값 가져오기
        return null;
    }

    private KakaoUserAuthDto userAuth(KakaoAuthRequest kakaoAuthRequest) {
        // webclient로 통신해서 access token, refresh token받아오기
        WebClient webClient=WebClient.builder()
                                    .baseUrl("https://kauth.kakao.com/oauth/token")
                                    .defaultHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                                    .build();

        MultiValueMap<String, String> formData=new LinkedMultiValueMap<>();
        formData.add("grant_type","authorization_code");
        formData.add("client_id",client_id);
        formData.add("redirect_uri",redirect_uri);
        formData.add("code",kakaoAuthRequest.getCode());

        return webClient
                .post()
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(KakaoUserAuthDto.class)
                .block();

    }


}
