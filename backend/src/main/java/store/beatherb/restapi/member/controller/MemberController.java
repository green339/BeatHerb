package store.beatherb.restapi.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity signUp(@RequestBody SignUpRequest signUpRequest){
        memberService.signUp(signUpRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity signIn(@RequestBody SignInRequest signInRequest){
        memberService.signIn(signInRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/signin/kakao")
    public ResponseEntity KakaoSignIn(@RequestBody OAuthRequest oauthRequest){
        memberService.socialSignIn(oauthRequest, Provider.KAKAO);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/signin/naver")
    public ResponseEntity NaverSignIn(@RequestBody OAuthRequest oauthRequest){
        memberService.socialSignIn(oauthRequest, Provider.NAVER);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/signin/google")
    public ResponseEntity GoogleSignIn(@RequestBody OAuthRequest oauthRequest){
        memberService.socialSignIn(oauthRequest, Provider.GOOGLE);
        return new ResponseEntity(HttpStatus.OK);
    }
}
