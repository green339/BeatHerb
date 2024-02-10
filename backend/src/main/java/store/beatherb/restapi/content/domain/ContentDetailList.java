package store.beatherb.restapi.content.domain;

import lombok.Builder;
import lombok.Data;
import store.beatherb.restapi.content.dto.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Data
public class ContentDetailList {
    // Content table
    Long id;                        // 컨텐츠 id
    String title;                   // 컨텐츠 제목
    String lyrics;                  // 컨텐츠 가사
    String describe;                // 컨텐츠 설명
    LocalDateTime createdAt;        // 컨텐츠 생성일
    int hit;                        // 컨텐츠 조회수

    List<CreatorDTO> creators;         // 창작가 목록
    ContentTypeDTO contentType;        // 컨텐츠 타입
    List<HashTagDTO> hashTags;         // 컨텐츠 태그 목록
    List<CommentDTO> comments;         // 컨탠츠 댓글 목록
    List<ContentDTO> inorder;          // 컨텐츠 진입차수
//        List<ContentDTO> outorder;         // 컨텐츠 진출차수

    public static ContentDetailList toDto(Content content, List<CommentDTO> comments) {
        List<CreatorDTO> creatorDTOs = new ArrayList<>();
        for (Creator c : content.getCreatorList()){
            CreatorDTO dto = CreatorDTO.toDto(c);
            creatorDTOs.add(dto);
        }

        List<ContentDTO> inorderDTOs = new ArrayList<>();
        for (InOrder i : content.getInOrderList()){
            ContentDTO dto = ContentDTO.toDto(i.getChildContent());
            inorderDTOs.add(dto);
        }

        List<HashTagDTO> hashTagDTOS = new ArrayList<>();
        for (ContentHashTag c : content.getContentHashTagList()){
            HashTagDTO dto = HashTagDTO.toDto(c.getHashTag());
            hashTagDTOS.add(dto);
        }

        return ContentDetailList.builder()
                .id(content.getId())
                .title(content.getTitle())
                .lyrics(content.getLyrics())
                .describe(content.getDescribe())
                .createdAt(content.getCreatedAt())
                .hit(content.getHit())
                .creators(creatorDTOs)
                .contentType(ContentTypeDTO.toDto(content.getContentType()))
                .hashTags(hashTagDTOS)
                .inorder(inorderDTOs)
                .comments(comments)
//              .outorder(content.getOutorder())
                .build();
    }
}