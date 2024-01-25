package store.beatherb.restapi.auth.dto.oauth;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class NaverUserInfoDto implements ProviderUserInfoDto {
    // 이메일 식별자
    private String resultcode;
    private String message;
    private Response response;
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response{
        private String id;
        private String email;
    }
}
