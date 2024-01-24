package store.beatherb.restapi.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.member.dto.NaverUserAuthDto;
import store.beatherb.restapi.member.dto.ProviderAuthUserInfoDto;
import store.beatherb.restapi.member.dto.request.NaverAuthRequest;
import store.beatherb.restapi.member.dto.response.TokenResponse;

@Service
@Slf4j
@RequiredArgsConstructor
public class NaverAuthService {
    @Value("${naver.client_id}")
    private String client_id;
    @Value("${naver.redirect_uri}")
    private String redirect_uri;
    @Value("${naver.client_secret}")
    private String client_secret;
    @Value("${naver.state}")
    private String state;
    @Value("${naver.base_uri}")
    private String base_uri;
    public TokenResponse auth(NaverAuthRequest naverAuthRequest){
        //1. access token refresh token id token 받아옴
        //2. access token 이용해서 이메일/식별자 받아옴
        NaverUserAuthDto naverUserAuthDto=userAuth(naverAuthRequest);
        log.info(naverUserAuthDto.toString());
        ProviderAuthUserInfoDto providerAuthUserInfoDto=userInfo(naverUserAuthDto);
        return null;
    }

    private ProviderAuthUserInfoDto userInfo(NaverUserAuthDto naverUserAuthDto) {
        // 서버에서 EMAIL 값 가져오기
        WebClient webClient=WebClient.builder()
                .baseUrl("https://openapi.naver.com/v1/nid/me")
                .defaultHeader("Authorization","Bearer "+naverUserAuthDto.getAccess_token())
                .build();
        String str=webClient.get().retrieve().bodyToMono(String.class).block();
        log.info(str);
        return null;
    }

    private NaverUserAuthDto userAuth(NaverAuthRequest naverAuthRequest) {
        // webclient로 통신해서 access token, refresh token받아오기
        WebClient webClient=WebClient.builder()
                .baseUrl("https://nid.naver.com/oauth2.0/token")
                .build();

        MultiValueMap<String, String> formData=new LinkedMultiValueMap<>();
        formData.add("grant_type","authorization_code");
        formData.add("client_id",client_id);
        formData.add("redirect_uri",redirect_uri);
        formData.add("client_secret",client_secret);
        formData.add("state",state);
        formData.add("code",naverAuthRequest.getCode());

        return webClient
                .post()
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(NaverUserAuthDto.class)
                .block();

    }

}
