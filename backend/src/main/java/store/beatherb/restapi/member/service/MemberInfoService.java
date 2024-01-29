package store.beatherb.restapi.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.member.exception.MemberErrorCode;
import store.beatherb.restapi.member.exception.MemberException;
import store.beatherb.restapi.oauth.dto.Provider;
import store.beatherb.restapi.oauth.dto.request.OAuthRequest;
import store.beatherb.restapi.oauth.service.OAuthService;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberInfoService {
    private final MemberRepository memberRepository;
    private final OAuthService oauthService;
    //회원가입하고 정보수정

    //정보수정에서 소셜연동하기
    public void linkage(OAuthRequest oauthRequest, Provider provider) {
        Long id;//헤더에서 access token을 받아와서 id값 가져오기. 토큰값 확인
        Member member=memberRepository.findById(1L)
                .orElseThrow(()->new MemberException(MemberErrorCode.MEMBER_FIND_ERROR));
        String sub=oauthService.sub(oauthRequest,provider);
        switch(provider){
            case KAKAO -> {
                memberRepository.findByKakao(sub)
                        .ifPresent(i->{throw new MemberException(MemberErrorCode.SOCIAL_EXIST);});
                member.setKakao(sub);
            }
            case NAVER -> {
                memberRepository.findByNaver(sub)
                        .ifPresent(i->{throw new MemberException(MemberErrorCode.SOCIAL_EXIST);});
                member.setNaver(sub);
            }
            case GOOGLE -> {
                memberRepository.findByGoogle(sub)
                        .ifPresent(i->{throw new MemberException(MemberErrorCode.SOCIAL_EXIST);});
                member.setGoogle(sub);
            }
        }
        memberRepository.save(member);
    }
}
