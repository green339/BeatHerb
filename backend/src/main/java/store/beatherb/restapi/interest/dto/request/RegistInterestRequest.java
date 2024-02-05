package store.beatherb.restapi.interest.dto.request;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@Builder
@AllArgsConstructor
public class RegistInterestRequest {
    private Long hashTagId;
}
