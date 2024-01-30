package store.beatherb.restapi.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import store.beatherb.restapi.global.auth.dto.response.VerifyTokenResponse;
import store.beatherb.restapi.global.response.ApiResponse;
import store.beatherb.restapi.member.dto.request.SignInRequest;
import store.beatherb.restapi.member.dto.request.SignUpRequest;
import store.beatherb.restapi.member.service.MemberService;
import store.beatherb.restapi.oauth.dto.Provider;
import store.beatherb.restapi.oauth.dto.request.OAuthRequest;

@RestController
@RequestMapping("/api/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/signup")
    public ApiResponse<?> signUp(@RequestBody SignUpRequest signUpRequest){
        memberService.signUp(signUpRequest);
        return ApiResponse.successWithoutData();
    }

    @PostMapping("/signin")
    public ApiResponse<?> signIn(@RequestBody SignInRequest signInRequest){
        memberService.signIn(signInRequest);
        return ApiResponse.successWithoutData();
    }

    @PostMapping("/signin/kakao")
    public ApiResponse<VerifyTokenResponse> KakaoSignIn(@RequestBody OAuthRequest oauthRequest){
        return ApiResponse.successWithData(memberService.socialSignIn(oauthRequest, Provider.KAKAO));

    }

    @PostMapping("/signin/naver")
    public ApiResponse<VerifyTokenResponse> NaverSignIn(@RequestBody OAuthRequest oauthRequest){
        return ApiResponse.successWithData(memberService.socialSignIn(oauthRequest, Provider.NAVER));
    }

    @PostMapping("/signin/google")
    public ApiResponse<VerifyTokenResponse> GoogleSignIn(@RequestBody OAuthRequest oauthRequest){
        return ApiResponse.successWithData(memberService.socialSignIn(oauthRequest, Provider.GOOGLE));
    }
}
