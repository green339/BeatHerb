package store.beatherb.restapi.live.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
public class LiveJoinRequest {
    Long liveId;
}
