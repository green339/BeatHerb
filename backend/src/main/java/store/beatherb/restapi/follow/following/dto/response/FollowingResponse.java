package store.beatherb.restapi.follow.following.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class FollowingResponse {
    private String name;
}
