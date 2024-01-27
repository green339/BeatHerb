package store.beatherb.restapi.oauth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.member.exception.MemberErrorCode;
import store.beatherb.restapi.member.exception.MemberException;
import store.beatherb.restapi.oauth.dto.Provider;
import store.beatherb.restapi.oauth.dto.request.OAuthRequest;
import store.beatherb.restapi.oauth.exception.OAuthErrorCode;
import store.beatherb.restapi.oauth.exception.OAuthException;

import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
public class OAuthService {
    private final GoogleService googleService;
    private final NaverService naverService;
    private final KakaoService kakaoService;
    private final MemberRepository memberRepository;

    public String linkage(OAuthRequest oauthRequest,Provider provider){
        String sub=null;
        switch(provider){
            case KAKAO -> {
                String accessToken=kakaoService.userAuth(oauthRequest.getCode());
                sub=kakaoService.userInfo(accessToken);
            }
            case NAVER -> {
                String accessToken=naverService.userAuth(oauthRequest.getCode());
                sub=naverService.userInfo(accessToken);
            }
            case GOOGLE -> {
                String accessToken=googleService.userAuth(oauthRequest.getCode());
                sub=googleService.userInfo(accessToken);
            }
        }
        if(sub==null) {
            throw new OAuthException(OAuthErrorCode.FAIL_TO_GET_INFO);
        }
        return sub;
    }

    public Member signIn(OAuthRequest oauthRequest,Provider provider){
        Optional<Member> member=Optional.empty();
        switch(provider){
            case KAKAO -> {
                String accessToken=kakaoService.userAuth(oauthRequest.getCode());
                String sub=kakaoService.userInfo(accessToken);
                member= memberRepository.findByKakao(sub);
            }
            case NAVER -> {
                String accessToken=naverService.userAuth(oauthRequest.getCode());
                String sub=naverService.userInfo(accessToken);
                member= memberRepository.findByNaver(sub);
            }
            case GOOGLE -> {
                String accessToken=googleService.userAuth(oauthRequest.getCode());
                String sub=googleService.userInfo(accessToken);
                member= memberRepository.findByGoogle(sub);
            }
        }
        return member.orElseThrow(()->new MemberException(MemberErrorCode.SOCIAL_IS_NOT_EXIST));
    }


}
