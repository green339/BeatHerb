package store.beatherb.restapi.auth.dto.oauth;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class OIDCDto implements ProviderUserInfoDto {
    @NotNull(message="sub 반드시")
    private String sub;
    @NotNull(message="email 반드시")
    private String email;
}
