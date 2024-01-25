package store.beatherb.restapi.auth.dto.response;

import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
//@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class AuthVerifyTokenResponse {
    public String accessToken;
    public String refreshToken;
    public String name;
    public int expireIn;
}
