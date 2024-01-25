package store.beatherb.restapi.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.auth.dto.oauth.Provider;
import store.beatherb.restapi.auth.dto.request.AuthJoinRequest;
import store.beatherb.restapi.auth.dto.response.AuthVerifyTokenResponse;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;

    public AuthVerifyTokenResponse emailJoin(AuthJoinRequest authJoinRequest){
        List<Member> members=memberRepository.findByEmail(authJoinRequest.getEmail());
        //중복인지 찾기
        boolean unique=true;
        for(Member m:members){
            if(m.getSub()==null){
                //에러 호출해서 보내버리기
                unique=false;
                break;
            }
        }
        if(unique) {
            Member member=new Member();
            member.setEmail(authJoinRequest.getEmail());
            memberRepository.save(member);
            //이메일 인증까지 여기서 보내주기
        }
        return null;
    }

    public AuthVerifyTokenResponse socialJoinLogin(AuthJoinRequest authJoinRequest){
        Member member=memberRepository.findBySub(authJoinRequest.getIdentifier(),authJoinRequest.getEmail());
        //정보 디비에 저장
        if(member==null){
            member=new Member();
            member.setEmail(authJoinRequest.getEmail());
            member.setSub(authJoinRequest.getIdentifier());
            memberRepository.save(member);
        }
        //이메일 인증없이 바로 access token, refresh token 보내주기

        return null;
    }

}
