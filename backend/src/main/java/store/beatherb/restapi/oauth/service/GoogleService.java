package store.beatherb.restapi.oauth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.oauth.dto.GoogleUserAuthDto;

import static store.beatherb.restapi.global.util.DecodeUtil.payloadDecoder;
import static store.beatherb.restapi.global.util.DecodeUtil.urlDecoder;


@Service
@Slf4j
@RequiredArgsConstructor
public class GoogleService {
    @Value("${google.auth_base_url}")
    private String authBaseUrl;
    @Value("${google.client_id}")
    private String clientId;
    @Value("${google.redirect_uri}")
    private String redirectUri;
    @Value("${google.client_secret}")
    private String clientSecret;

    private final MemberRepository memberRepository;

    public String userInfo(String idToken) {
        String jwtPayload= idToken.split("\\.")[1];
        return payloadDecoder(jwtPayload);
    }

    public String userAuth(String code) {
        // webclient로 통신해서 access token, refresh token받아오기
        WebClient webClient=WebClient.builder()
                .baseUrl(authBaseUrl)
                .build();

        MultiValueMap<String, String> formData=new LinkedMultiValueMap<>();
        formData.add("grant_type","authorization_code");
        formData.add("client_id",clientId);
        formData.add("redirect_uri",redirectUri);
        formData.add("client_secret",clientSecret);
        formData.add("code", urlDecoder(code));


        GoogleUserAuthDto googleUserAuthDto= webClient
                .post()
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(GoogleUserAuthDto.class)
                .block();

        return googleUserAuthDto.getIdToken();
    }

}
