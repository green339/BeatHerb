package store.beatherb.restapi.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import store.beatherb.restapi.member.service.MemberInfoService;
import store.beatherb.restapi.oauth.dto.NaverUserInfoDto;
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
    public ResponseEntity<HttpStatus> KakaoLinkage(@RequestBody OAuthRequest oauthRequest){
        memberInfoService.linkage(oauthRequest, Provider.KAKAO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/linkage/naver")
    public ResponseEntity<HttpStatus> NaverLinkage(@RequestBody OAuthRequest oauthRequest){
        memberInfoService.linkage(oauthRequest, Provider.NAVER);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/linkage/google")
    public ResponseEntity<HttpStatus> GoogleLinkage(@RequestBody OAuthRequest oauthRequest){
        memberInfoService.linkage(oauthRequest, Provider.GOOGLE);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
