package store.beatherb.restapi.content.dto.request;

import lombok.*;
import store.beatherb.restapi.content.domain.Comment;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@Builder
@AllArgsConstructor
public class RegistCommentRequest {
    Long contentId;
    Comment comment;
}
