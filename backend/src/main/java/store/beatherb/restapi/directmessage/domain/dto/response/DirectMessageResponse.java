package store.beatherb.restapi.directmessage.domain.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Builder
@Getter
@AllArgsConstructor
public class DirectMessageResponse {
    Timestamp createdAt;
}
