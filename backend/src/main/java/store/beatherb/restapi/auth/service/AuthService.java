package store.beatherb.restapi.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.auth.dto.oauth.Provider;
import store.beatherb.restapi.auth.dto.request.AuthJoinRequest;
import store.beatherb.restapi.auth.dto.response.AuthVerifyTokenResponse;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;

    public boolean findMember(AuthJoinRequest authJoinRequest){
        Member member;
        if(authJoinRequest.getProvider()==Provider.BEATHERB){
            member=memberRepository.findByEmail(authJoinRequest.getEmail());
        }else{
            member=memberRepository.findBySub(authJoinRequest.getIdentifier());
            if(member==null){
                member=memberRepository.findByEmail(authJoinRequest.getEmail());
            }
        }
        return member == null;
    }
    public void socialLogin(AuthJoinRequest authJoinRequest){
        //이메일 인증없이 바로 access token, refresh token 보내주기
    }
    public AuthVerifyTokenResponse emailJoin(AuthJoinRequest authJoinRequest){
        //중복인지 찾기
        if (findMember(authJoinRequest)){
            //정보 디비에 저장
            memberRepository.insertMember(authJoinRequest);
            //이메일 인증까지 여기서 보내주기
        }else{
            //이미 있는 회원입니다.
        }
        return null;
    }

    public void socialJoin(AuthJoinRequest authJoinRequest){
        //정보 디비에 저장하고
        memberRepository.insertMember(authJoinRequest);
        //이메일 인증없이 바로 access token, refresh token 보내주기
    }

}
