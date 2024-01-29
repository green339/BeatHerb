package store.beatherb.restapi.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.global.validate.Email;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.member.dto.request.SignInRequest;
import store.beatherb.restapi.member.dto.request.SignUpRequest;
import store.beatherb.restapi.member.exception.MemberErrorCode;
import store.beatherb.restapi.member.exception.MemberException;
import store.beatherb.restapi.oauth.dto.Provider;
import store.beatherb.restapi.oauth.dto.request.OAuthRequest;
import store.beatherb.restapi.oauth.service.OAuthService;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final OAuthService oauthService;

    public void signUp(SignUpRequest signUpRequest){
        Email.validate(signUpRequest.getEmail());
        memberRepository.findByEmail(signUpRequest.getEmail())
                .ifPresent(i->{throw new MemberException(MemberErrorCode.EMAIL_EXIST);});
        memberRepository.save(Member.builder().email(signUpRequest.getEmail()).build());
        //이메일 인증 보내기
    }
    public void signIn (SignInRequest signInRequest){
        //이메일 인증 보내기
    }
    public void socialSignIn(OAuthRequest oauthRequest,Provider provider){
        String sub=oauthService.sub(oauthRequest, provider);
        Member member=null;
        switch(provider) {
            case KAKAO -> member = memberRepository.findByKakao(sub).orElseThrow(() -> new MemberException(MemberErrorCode.SOCIAL_IS_NOT_EXIST));
            case NAVER -> member = memberRepository.findByNaver(sub).orElseThrow(() -> new MemberException(MemberErrorCode.SOCIAL_IS_NOT_EXIST));
            case GOOGLE -> member = memberRepository.findByGoogle(sub).orElseThrow(() -> new MemberException(MemberErrorCode.SOCIAL_IS_NOT_EXIST));
        }
        //토큰 생성 결과값 보내기
    }

}
