package store.beatherb.restapi.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.member.dto.GoogleUserAuthDto;
import store.beatherb.restapi.member.dto.OIDCDto;
import store.beatherb.restapi.member.dto.Provider;
import store.beatherb.restapi.member.dto.request.GoogleAuthRequest;
import store.beatherb.restapi.member.dto.request.MemberJoinRequest;
import store.beatherb.restapi.member.dto.response.TokenResponse;

import java.util.Base64;

import static store.beatherb.restapi.member.Util.AuthUtil.payloadDecoder;


@Service
@Slf4j
@RequiredArgsConstructor
public class GoogleAuthService {
    @Value("${google.auth_base_url}")
    private String authBaseUrl;
    @Value("${google.client_id}")
    private String clientId;
    @Value("${google.redirect_uri}")
    private String redirectUri;
    @Value("${google.client_secret}")
    private String clientSecret;

    private final MemberService memberService;
    public TokenResponse auth(GoogleAuthRequest googleAuthRequest){
        //1. access token refresh token id token 받아옴
        GoogleUserAuthDto googleUserAuthDto=userAuth(googleAuthRequest);
        log.info(googleUserAuthDto.toString());
        //2. id 토큰 이용해서 이메일/식별자 받아옴
        MemberJoinRequest memberJoinRequest=userInfo(googleUserAuthDto);
        //회원가입, 로그인 로직으로 보내기
        if(memberService.findMember(memberJoinRequest)){
            memberService.socialLogin(memberJoinRequest);
        }else{
            memberService.socialJoin(memberJoinRequest);
        }
        //처리결과 보내기 (회원가입/로그인완료/에러)
        return null;
    }

    private MemberJoinRequest userInfo(GoogleUserAuthDto googleUserAuthDto) {
        // JWT 토큰을 디코딩해서 ID, SUB값 가져오기
        String jwtPayload= new String(Base64.getUrlDecoder().decode(googleUserAuthDto.getIdToken().split("\\.")[1]));
        OIDCDto oidcDto= payloadDecoder(jwtPayload);
        return MemberJoinRequest
                .builder()
                .provider(Provider.GOOGLE)
                .email(oidcDto.getEmail())
                .identifier("google "+oidcDto.getSub())
                .build();
    }

    private GoogleUserAuthDto userAuth(GoogleAuthRequest googleAuthRequest) {
        // webclient로 통신해서 access token, refresh token받아오기
        WebClient webClient=WebClient.builder()
                .baseUrl(authBaseUrl)
                .build();

        MultiValueMap<String, String> formData=new LinkedMultiValueMap<>();
        formData.add("grant_type","authorization_code");
        formData.add("client_id",clientId);
        formData.add("redirect_uri",redirectUri);
        formData.add("client_secret",clientSecret);
        formData.add("code",googleAuthRequest.getCode());

        return webClient
                .post()
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(GoogleUserAuthDto.class)
                .block();

    }

}
