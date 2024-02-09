package store.beatherb.restapi.content.dto.response;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@AllArgsConstructor
public class ContentResponse {
    private String title;
    private String name;
}
