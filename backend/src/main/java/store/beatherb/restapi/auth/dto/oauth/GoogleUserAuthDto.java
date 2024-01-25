package store.beatherb.restapi.auth.dto.oauth;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GoogleUserAuthDto implements ProviderUserAuthDto {
    //access token, refresh token, id token
    String accessToken;
    int expiresIn;
    String idToken;
    String scope;
}
