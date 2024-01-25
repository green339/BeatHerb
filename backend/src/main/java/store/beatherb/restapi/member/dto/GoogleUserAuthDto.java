package store.beatherb.restapi.member.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GoogleUserAuthDto {
    //access token, refresh token, id token
    String accessToken;
    int expiresIn;
    String idToken;
    String scope;
}
