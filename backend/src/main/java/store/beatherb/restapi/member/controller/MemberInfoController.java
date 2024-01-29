package store.beatherb.restapi.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import store.beatherb.restapi.member.service.MemberInfoService;
import store.beatherb.restapi.oauth.dto.Provider;
import store.beatherb.restapi.oauth.dto.request.OAuthRequest;

@RestController
@RequestMapping("/api/member/info")
@Slf4j
@RequiredArgsConstructor
public class MemberInfoController {
    private final MemberInfoService memberInfoService;
    //회원가입하고 회원정보 저장

    //소셜로그인 연동
    @PostMapping("/linkage/kakao")
    public void KakaoLinkage(@RequestBody OAuthRequest oauthRequest){
        memberInfoService.linkage(oauthRequest, Provider.KAKAO);
    }

    @PostMapping("/linkage/naver")
    public void NaverLinkage(@RequestBody OAuthRequest oauthRequest){
        memberInfoService.linkage(oauthRequest, Provider.NAVER);
    }

    @PostMapping("/linkage/google")
    public void GoogleLinkage(@RequestBody OAuthRequest oauthRequest){
        memberInfoService.linkage(oauthRequest, Provider.GOOGLE);
    }

}
