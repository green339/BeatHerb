package store.beatherb.restapi.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.member.dto.MemberDTO;
import store.beatherb.restapi.member.dto.request.EditRequest;
import store.beatherb.restapi.member.exception.MemberErrorCode;
import store.beatherb.restapi.member.exception.MemberException;
import store.beatherb.restapi.oauth.dto.Provider;
import store.beatherb.restapi.oauth.dto.request.OAuthRequest;
import store.beatherb.restapi.oauth.service.OAuthService;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberInfoService {
    private final MemberRepository memberRepository;
    private final OAuthService oauthService;

    //회원 정보 수정
    public void edit(MemberDTO memberDTO, EditRequest editRequest) {


        String nickname = editRequest.getNickname();
        boolean isDmAgree = editRequest.isDmAgree();
        String picture = editRequest.getPicture();


        Member member = memberRepository.findById(memberDTO.getId())
                        .orElseThrow(()->new MemberException(MemberErrorCode.MEMBER_FIND_ERROR));

        member.setNickname(nickname);
        member.setDmAgree(isDmAgree);
        if(picture!=null){
            member.setPicture(picture);
        }

        memberRepository.save(member);

    }

    //회원 정보 수정 - 소셜 로그인 연동
    public void linkage(OAuthRequest oauthRequest, Provider provider, MemberDTO memberDTO) {
        Long id;//헤더에서 access token을 받아와서 id값 가져오기. 토큰값 확인
        log.info("사용자 정보"+memberDTO.getId());
        Member member=memberRepository.findById(memberDTO.getId())
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
