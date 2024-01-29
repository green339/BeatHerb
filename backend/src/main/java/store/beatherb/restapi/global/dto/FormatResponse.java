package store.beatherb.restapi.global.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FormatResponse {
    private String code;
    private String message;
    private Data data;
}
