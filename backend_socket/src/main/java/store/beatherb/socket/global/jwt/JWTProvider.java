package store.beatherb.socket.global.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Map;

@Slf4j
@Component
public class JWTProvider {
    @Value("${jwt.salt}")
    private String salt;


    // Signature에 설정에 들어갈 key 생성
    private byte[] generateKey(){
        byte[] key = null;
        try{
            key = salt.getBytes("UTF-8");
        } catch(UnsupportedEncodingException e){
            if(log.isInfoEnabled()){
                e.printStackTrace();
            } else{
                log.error("Making JWT Key Error ::: {}", e.getMessage());
            }
        }
        return key;
    }

    //전달 받은 토큰이 유효한 토큰인지 확인하고 문제가 있다면 UnauthorizedException 발생
    public boolean checkToken(String token){
        try{
            //setSigningKey : JWS 서명 검증을 위한 secret key 세팅
            //parseClaimsJws : 파싱하여 원본 jws 만들기
            Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(token);
            //Claims는 Map의 구현체 형태
            log.debug("claims: {}", claims);

            return true;
        } catch(Exception e){
            log.error(e.getMessage());
            return false;
        }
    }

    public Long getMemberPrimaryKeyId(String token){
        Jws<Claims> claims = null;
        try{
            claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(token);
        } catch(Exception e){
            log.error(e.getMessage());
        }

        Map<String, Object> value = claims.getBody();
        log.info("value : {}", value);


        return ((Number)value.get("id")).longValue();
    }

//    public VerifyTokenResponse generateVerifyTokenResponse(long id){
//        String accessToken = createAccessToken(id);
//        String refreshToken = createRefreshToken(id);
//
//        return VerifyTokenResponse.builder()
//                .accessToken(accessToken)
//                .refreshToken(refreshToken)
//                .accessTokenExpiresIn(this.accessTokenExpiresIn)
//                .refreshTokenExpiresIn(this.refreshTokenExpiresIn)
//                .build();
//    }
}
