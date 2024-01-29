package store.beatherb.restapi.oauth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class KakaoUserAuthDto {
    //access token, refresh token, id token
    String accessToken;
    String tokenType;
    String refreshToken;
    @NotNull
    String idToken;
    int expiresIn;
    String scope;
    int refreshTokenExpiresIn;

}
