package store.beatherb.restapi.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import store.beatherb.restapi.global.auth.domain.LoginUser;
import store.beatherb.restapi.global.response.ApiResponse;
import store.beatherb.restapi.member.dto.MemberDTO;
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

    @PostMapping("/linkage/kakao")
    public ApiResponse<?> KakaoLinkage(@LoginUser MemberDTO memberDTO, @RequestBody OAuthRequest oauthRequest){
        memberInfoService.linkage(oauthRequest, Provider.KAKAO,memberDTO);
        return ApiResponse.successWithoutData();
    }

    @PostMapping("/linkage/naver")
    public ApiResponse<?> NaverLinkage(@LoginUser MemberDTO memberDTO, @RequestBody OAuthRequest oauthRequest){
        memberInfoService.linkage(oauthRequest, Provider.NAVER,memberDTO);
        return ApiResponse.successWithoutData();
    }

    @PostMapping("/linkage/google")
    public ApiResponse<?> GoogleLinkage(@LoginUser MemberDTO memberDTO, @RequestBody OAuthRequest oauthRequest){
        memberInfoService.linkage(oauthRequest, Provider.GOOGLE,memberDTO);
        return ApiResponse.successWithoutData();
    }

}
