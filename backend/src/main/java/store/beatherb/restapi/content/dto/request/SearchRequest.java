package store.beatherb.restapi.content.dto.request;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@AllArgsConstructor
public class SearchRequest {
    String genre;
    String bpm;
    String keyNote;
    String instrument;
    String keyword;
}
