package store.beatherb.restapi.oauth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.oauth.dto.KakaoUserAuthDto;

import static store.beatherb.restapi.global.util.DecodeUtil.payloadDecoder;

@Service
@Slf4j
@RequiredArgsConstructor
public class KakaoService {
    @Value("${kakao.client_id}")
    private String clientId;
    @Value("${kakao.redirect_uri}")
    private String redirectUri;
    @Value("${kakao.auth_base_url}")
    private String authBaseUrl;

    public String userInfo(String idToken){
        // JWT 토큰을 디코딩해서 ID, SUB값 가져오기
        String jwtPayload= idToken.split("\\.")[1];
        log.info("payload: "+jwtPayload);
        return payloadDecoder(jwtPayload);
    }

    public String userAuth(String code) {
        WebClient webClient=WebClient.builder()
                                    .baseUrl(authBaseUrl)
                                    .defaultHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                                    .build();

        MultiValueMap<String, String> formData=new LinkedMultiValueMap<>();
        formData.add("grant_type","authorization_code");
        formData.add("client_id",clientId);
        formData.add("redirect_uri",redirectUri);
        formData.add("code", code);

        KakaoUserAuthDto kakaoUserAuthDto=webClient
                .post()
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(KakaoUserAuthDto.class)
                .block();

        return kakaoUserAuthDto.getIdToken();
    }
}
