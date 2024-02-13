package store.beatherb.restapi.content.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.content.domain.Star;
import store.beatherb.restapi.member.domain.Member;

@Data
@AllArgsConstructor
@Builder
public class FavoriteDTO {
    private long id;
    private Content content;
    private Member member;
    public static FavoriteDTO toDTO(Star entity) {
        return FavoriteDTO.builder()
              .id(entity.getId())
              .content(entity.getContent())
              .member(entity.getMember())
              .build();
    }
}
