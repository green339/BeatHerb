package store.beatherb.restapi.member.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
//@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TokenResponse {
    public String accessToken;
    public String refreshToken;
    public String name;
    public int expireIn;
}
