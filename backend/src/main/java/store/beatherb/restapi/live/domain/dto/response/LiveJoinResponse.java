package store.beatherb.restapi.live.domain.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
public class LiveJoinResponse {

    String role;
    String token;
}
