package store.beatherb.restapi.content.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.content.domain.Star;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.dto.MemberDTO;

@Data
@AllArgsConstructor
@Builder
public class FavoriteDTO {
    private long id;
    private ContentDTO content;
    private MemberDTO member;
    public static FavoriteDTO toDTO(Star entity) {
        return FavoriteDTO.builder()
              .id(entity.getId())
              .content(ContentDTO.toDto(entity.getContent()))
              .member(MemberDTO.toDTO(entity.getMember()))
              .build();
    }
}
