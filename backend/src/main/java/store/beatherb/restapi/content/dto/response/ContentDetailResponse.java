package store.beatherb.restapi.content.dto.response;

import lombok.*;
import store.beatherb.restapi.content.domain.*;
import store.beatherb.restapi.content.dto.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class ContentDetailResponse {
    List<ContentDetailList> contentDetails;
}
