package store.beatherb.restapi.live.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
public class LiveCreateRequest {
    @NotNull(message = "title 이 필요합니다")
    String title;
    @NotNull(message = "describe 가 필요합니다.")
    String describe;
    Set<Long> publisherId;

    public LiveCreateRequest(String title, String describe, Set<Long> publisherId) {
        this.title = title;
        this.describe = describe;
        this.publisherId = publisherId;
        if(publisherId ==null){
            this.publisherId = new HashSet<>();
        }
    }
}
