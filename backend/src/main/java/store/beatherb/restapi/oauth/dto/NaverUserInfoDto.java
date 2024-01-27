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
public class NaverUserInfoDto {
    // 이메일 식별자
    private String resultcode;
    private String message;
    private Response response;
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response{
        @NotNull
        private String id;
        private String email;
    }
}
