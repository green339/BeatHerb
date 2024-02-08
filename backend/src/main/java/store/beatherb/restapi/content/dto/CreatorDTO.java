package store.beatherb.restapi.content.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import store.beatherb.restapi.content.domain.Creator;
import store.beatherb.restapi.member.dto.MemberDTO;

@Data
@AllArgsConstructor
@Builder
public class CreatorDTO {
    private Long id;
    private MemberDTO creator;
    private ContentDTO content;

    public static CreatorDTO toDto(Creator entity) {
        return CreatorDTO.builder()
              .id(entity.getId())
              .creator(MemberDTO.toDTO(entity.getCreator()))
              .content(ContentDTO.toDto(entity.getContent()))
              .build();
    }
}
