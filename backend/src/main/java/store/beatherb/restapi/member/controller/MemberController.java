package store.beatherb.restapi.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import store.beatherb.restapi.global.auth.dto.response.VerifyTokenResponse;
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
    public ResponseEntity<HttpStatus> signUp(@RequestBody SignUpRequest signUpRequest){
        memberService.signUp(signUpRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<HttpStatus> signIn(@RequestBody SignInRequest signInRequest){
        memberService.signIn(signInRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/signin/kakao")
    public VerifyTokenResponse KakaoSignIn(@RequestBody OAuthRequest oauthRequest){
        return memberService.socialSignIn(oauthRequest, Provider.KAKAO);
    }

    @PostMapping("/signin/naver")
    public VerifyTokenResponse NaverSignIn(@RequestBody OAuthRequest oauthRequest){
        return memberService.socialSignIn(oauthRequest, Provider.NAVER);
    }

    @PostMapping("/signin/google")
    public VerifyTokenResponse GoogleSignIn(@RequestBody OAuthRequest oauthRequest){
        return memberService.socialSignIn(oauthRequest, Provider.GOOGLE);
    }
}
