package store.beatherb.restapi.auth.dto.oauth;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class NaverUserAuthDto implements ProviderUserAuthDto {
    //access token, refresh token
    String accessToken;
    String refreshToken;
    String tokenType;
    int expiresIn;
    String error;
    String errorDescription;

}
