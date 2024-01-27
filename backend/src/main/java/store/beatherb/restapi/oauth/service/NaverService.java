package store.beatherb.restapi.oauth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.oauth.dto.NaverUserAuthDto;
import store.beatherb.restapi.oauth.dto.NaverUserInfoDto;


@Service
@Slf4j
@RequiredArgsConstructor
public class NaverService {
    @Value("${naver.client_id}")
    private String clientId;
    @Value("${naver.redirect_uri}")
    private String redirectUri;
    @Value("${naver.client_secret}")
    private String clientSecret;
    @Value("${naver.state}")
    private String state;
    @Value("${naver.auth_base_url}")
    private String authBaseUrl;
    @Value("${naver.info_base_url}")
    private String infoBaseUrl;

    public String userInfo(String accessToken) {
        WebClient webClient=WebClient.builder()
                .baseUrl(infoBaseUrl)
                .defaultHeader("Authorization","Bearer "+accessToken)
                .build();
        NaverUserInfoDto naverUserInfoDto =webClient.get().retrieve().bodyToMono(NaverUserInfoDto.class).block();
        return naverUserInfoDto.getResponse().getId();
    }

    public String userAuth(String code) {
        WebClient webClient=WebClient.builder()
                .baseUrl(authBaseUrl)
                .build();

        MultiValueMap<String, String> formData=new LinkedMultiValueMap<>();
        formData.add("grant_type","authorization_code");
        formData.add("client_id",clientId);
        formData.add("redirect_uri",redirectUri);
        formData.add("client_secret",clientSecret);
        formData.add("state",state);
        formData.add("code", code);
        //에러코드일 경우 처리추가
        NaverUserAuthDto naverUserAuthDto= webClient
                .post()
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(NaverUserAuthDto.class)
                .block();
        return naverUserAuthDto.getAccessToken();
    }

}
