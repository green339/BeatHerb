package store.beatherb.restapi.global.auth.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import store.beatherb.restapi.global.jwt.JWT;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
public class VerifyTokenResponse {
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpiresIn;
    private String name;

    @Builder
    public VerifyTokenResponse(String accessToken, String refreshToken, Long accessTokenExpiresIn, String name){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.accessTokenExpiresIn = accessTokenExpiresIn;
        this.name = name;
    }
}
