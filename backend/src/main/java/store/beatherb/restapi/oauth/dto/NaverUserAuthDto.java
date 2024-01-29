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
public class NaverUserAuthDto {
    //access token, refresh token
    @NotNull
    String accessToken;
    String refreshToken;
    String tokenType;
    int expiresIn;
    String error;
    String errorDescription;

}
