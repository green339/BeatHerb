package store.beatherb.restapi.follow.follower.dto.response;

import lombok.Builder;
import lombok.Data;
import store.beatherb.restapi.member.domain.Member;

@Data
@Builder
public class FollowersResponse {
    private String name;
}
