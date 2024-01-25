package store.beatherb.restapi.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.auth.dto.oauth.NaverUserAuthDto;
import store.beatherb.restapi.auth.dto.oauth.NaverUserInfoDto;
import store.beatherb.restapi.auth.dto.oauth.Provider;
import store.beatherb.restapi.auth.dto.request.AuthJoinRequest;
import store.beatherb.restapi.auth.dto.request.AuthOAuthNaverRequest;
import store.beatherb.restapi.auth.dto.response.AuthVerifyTokenResponse;

@Service
@Slf4j
@RequiredArgsConstructor
public class NaverAuthService {
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

    private final AuthService authService;
    public AuthVerifyTokenResponse auth(AuthOAuthNaverRequest authOAuthNaverRequest){
        //1. access token refresh token id token 받아옴
        //2. access token 이용해서 이메일/식별자 받아옴
        NaverUserAuthDto naverUserAuthDto=userAuth(authOAuthNaverRequest);
        AuthJoinRequest authJoinRequest =userInfo(naverUserAuthDto);
        //회원가입, 로그인 로직으로 보내기(providerAuthUserInfoDto)
        authService.socialJoinLogin(authJoinRequest);
        //처리결과 보내기 (회원가입/로그인완료)
        return null;
    }

    private AuthJoinRequest userInfo(NaverUserAuthDto naverUserAuthDto) {
        // 서버에서 EMAIL 값 가져오기
        WebClient webClient=WebClient.builder()
                .baseUrl(infoBaseUrl)
                .defaultHeader("Authorization","Bearer "+naverUserAuthDto.getAccessToken())
                .build();
        NaverUserInfoDto naverUserInfoDto =webClient.get().retrieve().bodyToMono(NaverUserInfoDto.class).block();
        //에러코드일 경우 처리추가
        return AuthJoinRequest
                .builder()
                .provider(Provider.NAVER)
                .email(naverUserInfoDto.getResponse().getEmail())
                .identifier("naver "+naverUserInfoDto.getResponse().getId())
                .build();
    }

    private NaverUserAuthDto userAuth(AuthOAuthNaverRequest authOAuthNaverRequest) {
        // webclient로 통신해서 access token, refresh token받아오기
        WebClient webClient=WebClient.builder()
                .baseUrl(authBaseUrl)
                .build();

        MultiValueMap<String, String> formData=new LinkedMultiValueMap<>();
        formData.add("grant_type","authorization_code");
        formData.add("client_id",clientId);
        formData.add("redirect_uri",redirectUri);
        formData.add("client_secret",clientSecret);
        formData.add("state",state);
        formData.add("code", authOAuthNaverRequest.getCode());
        //에러코드일 경우 처리추가
        return webClient
                .post()
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(NaverUserAuthDto.class)
                .block();
    }

}
