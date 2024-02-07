package store.beatherb.restapi.live.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class LiveCreateRequest {

    @NotNull(message = "title 이 필요합니다")

    String title;

    @NotNull(message = "describe 가 필요합니다.")
    String describe;
}
