package store.beatherb.restapi.global.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.global.auth.domain.*;
import store.beatherb.restapi.global.auth.dto.response.VerifyTokenResponse;
import store.beatherb.restapi.global.jwt.JWT;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final JWT jwt;
    private final AuthRepository authRepository;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    //uuid가 유효한지 확인
    public VerifyTokenResponse verify(String token){
        // uuid 정보가 table에 존재하는지 확인
        Auth auth = authRepository.findByUuid(token);

        String name = "";
        String id = "";
        // uuid 정보가 있다면 member의 이름을 받아오고
        // payload에 해당 member의 pk를 저장해야하기 때문에 pk 값을 가져온다.
        if(auth != null){
            id = String.valueOf(auth.getMember().getId());
            Member member = memberRepository.findById(auth.getMember().getId()).orElseThrow();
            name = member.getName();

            //generateVerifyTokenResponse 메서드는
            //AccessToken, RefreshToken을 생성한 후
            //AccessToken, RefreshToken, AccessTokenExpireTime에 대한 정보를 담아서 넘겨준다.
            VerifyTokenResponse verifyTokenResponse = jwt.generateVerifyTokenResponse(id);
            verifyTokenResponse.setName(name);

            //Redis에 RefreshToken을 저장
            RefreshToken refreshToken =
                    RefreshToken.builder()
                            .id(auth.getMember().getId())
                            .value(verifyTokenResponse.getRefreshToken())
                            .build();

            refreshTokenRepository.save(refreshToken);

            return verifyTokenResponse;
        }

        else{
            return null;
        }
    }
}
