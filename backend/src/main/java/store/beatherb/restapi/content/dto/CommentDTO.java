package store.beatherb.restapi.content.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import store.beatherb.restapi.content.domain.Comment;
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.dto.MemberDTO;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class CommentDTO {
    private long id;
    private MemberDTO member;
    private ContentDTO content;
    private String body;
    private LocalDateTime createdAt;

    public static CommentDTO toDto(Comment comment) {
        return CommentDTO.builder()
             .id(comment.getId())
             .member(MemberDTO.toDTO(comment.getMember()))
             .content(ContentDTO.toDto(comment.getContent()))
             .body(comment.getBody())
             .createdAt(comment.getCreatedAt())
             .build();
    }
}
