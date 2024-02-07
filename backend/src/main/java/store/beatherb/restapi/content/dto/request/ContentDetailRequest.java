package store.beatherb.restapi.content.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContentDetailRequest {
    @NotNull(message = "조회할 컨텐츠가 없습니다.")
    Long id;
}
