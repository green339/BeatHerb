package store.beatherb.restapi.oauth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.oauth.dto.Provider;
import store.beatherb.restapi.oauth.dto.request.OAuthRequest;
import store.beatherb.restapi.oauth.exception.OAuthErrorCode;
import store.beatherb.restapi.oauth.exception.OAuthException;


@Service
@Slf4j
@RequiredArgsConstructor
public class OAuthService {
    private final GoogleService googleService;
    private final NaverService naverService;
    private final KakaoService kakaoService;

    public String sub(OAuthRequest oauthRequest,Provider provider){
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
}
