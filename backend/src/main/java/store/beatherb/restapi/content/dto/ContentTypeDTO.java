package store.beatherb.restapi.content.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import store.beatherb.restapi.content.domain.ContentType;
import store.beatherb.restapi.content.domain.embed.ContentTypeEnum;

@Data
@AllArgsConstructor
@Builder
public class ContentTypeDTO {
    private long id;
    private ContentTypeEnum type;

    public static ContentTypeDTO toDto(ContentType entity) {
        return ContentTypeDTO.builder()
              .id(entity.getId())
              .type(entity.getType())
              .build();
    }
}
