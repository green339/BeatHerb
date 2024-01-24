package store.beatherb.restapi.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.member.dto.GoogleUserAuthDto;
import store.beatherb.restapi.member.dto.ProviderAuthUserInfoDto;
import store.beatherb.restapi.member.dto.request.GoogleAuthRequest;
import store.beatherb.restapi.member.dto.response.TokenResponse;

@Service
@Slf4j
@RequiredArgsConstructor
public class GoogleAuthService {
    @Value("${google.base_url}")
    private String base_url;
    @Value("${google.client_id}")
    private String client_id;
    @Value("${google.redirect_uri}")
    private String redirect_uri;
    @Value("${google.client_secret}")
    private String client_secret;

    public TokenResponse auth(GoogleAuthRequest googleAuthRequest){
        //1. access token refresh token id token 받아옴
        GoogleUserAuthDto googleUserAuthDto=userAuth(googleAuthRequest);
        log.info(googleUserAuthDto.toString());
        //2. id 토큰 이용해서 이메일/식별자 받아옴
        ProviderAuthUserInfoDto providerAuthUserInfoDto=userInfo(googleUserAuthDto);
        return null;
    }

    private ProviderAuthUserInfoDto userInfo(GoogleUserAuthDto googleUserAuthDto) {
        // JWT 토큰을 디코딩해서 ID, SUTB값 가져오기
        return null;
    }

    private GoogleUserAuthDto userAuth(GoogleAuthRequest googleAuthRequest) {
        // webclient로 통신해서 access token, refresh token받아오기
        WebClient webClient=WebClient.builder()
                .baseUrl(base_url)
                .build();

        MultiValueMap<String, String> formData=new LinkedMultiValueMap<>();
        formData.add("grant_type","authorization_code");
        formData.add("client_id",client_id);
        formData.add("redirect_uri",redirect_uri);
        formData.add("client_secret",client_secret);
        formData.add("code",googleAuthRequest.getCode());

        return webClient
                .post()
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(GoogleUserAuthDto.class)
                .block();

    }

}
