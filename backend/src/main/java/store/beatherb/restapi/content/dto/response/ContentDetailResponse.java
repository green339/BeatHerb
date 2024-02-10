package store.beatherb.restapi.content.dto.response;

import lombok.*;
import store.beatherb.restapi.content.domain.*;
import store.beatherb.restapi.content.dto.*;
import store.beatherb.restapi.member.domain.Member;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class ContentDetailResponse {

    List<ContentDetailResponseMember> creatorList;
    String title;
    ContentDetailResponseMember writer;
    List<ContentDetailResponseHashTag> hashTagList;
    String lyrics;
    String describe;
    int hit;
    boolean processed;
    String contentType;
    List<ContentDetailResponseInorder> inOrderList;



    public static ContentDetailResponse toDto(Content entity) {
        String title = entity.getTitle();
        Member writer = entity.getWriter();
        List<Creator> creatorList = entity.getCreatorList();
        List<ContentHashTag> contentHashTagList = entity.getContentHashTagList();
        String lyrics = entity.getLyrics();
        int hit = entity.getHit();
        String describe = entity.getDescribe();
        ContentType contentType = entity.getContentType();
        boolean processed = entity.isProcessed();


        LocalDateTime createdAt = entity.getCreatedAt();
        List<InOrder> inOrderList = entity.getInOrderList();

        List<ContentDetailResponseMember> creatorDtoList = new ArrayList<>();
        for(Creator c:creatorList){
            creatorDtoList.add(ContentDetailResponseMember.toDto(c));
        }

        List<ContentDetailResponseHashTag> hashTagDtoList = new ArrayList<>();
        for(ContentHashTag contentHashTag: contentHashTagList ){
            HashTag hashTag = contentHashTag.getHashTag();
            hashTagDtoList.add(
                    ContentDetailResponseHashTag.toDto(hashTag)
            );
        }
        List<ContentDetailResponseInorder> contentDetailResponseInorderList = new ArrayList<>();
        for(InOrder inOrder: inOrderList ){
            contentDetailResponseInorderList.add(

                    ContentDetailResponseInorder.toDto(inOrder)
            );
        }


        return ContentDetailResponse.builder()
                .title(title)
                .writer(ContentDetailResponseMember.toDto(writer))
                .creatorList(creatorDtoList)
                .hashTagList(hashTagDtoList)
                .lyrics(lyrics)
                .hit(hit)
                .describe(describe)
                .processed(processed)
                //.contentType(contentType.getType().name())
                .inOrderList(contentDetailResponseInorderList)
                .build();

    }

    @Getter
    private static class ContentDetailResponseMember {
        Long id;
        String nickname;

        @Builder
        public ContentDetailResponseMember(Long id, String nickname) {
            this.id = id;
            this.nickname = nickname;
        }

        public static ContentDetailResponseMember toDto(Creator creator) {
            Member member = creator.getCreator();
            return ContentDetailResponseMember.builder()
                    .id(member.getId())
                    .nickname(member.getNickname())
                    .build();
        }

        public static ContentDetailResponseMember toDto(Member member) {
            return ContentDetailResponseMember.builder()
                    .id(member.getId())
                    .nickname(member.getNickname())
                    .build();
        }
    }


    @Getter
    private static class ContentDetailResponseHashTag{
        Long id;
        String name;

        @Builder
        public ContentDetailResponseHashTag(Long id, String name) {
            this.id = id;
            this.name = name;
        }

        public static ContentDetailResponseHashTag toDto(HashTag entity){
            return ContentDetailResponseHashTag.builder()
                    .id(entity.getId())
                    .name(entity.getName())
                    .build();
        }
    }

    @Getter
    private static class ContentDetailResponseInorder{

        Long id;
        String title;

        @Builder
        public ContentDetailResponseInorder(Long id, String title) {
            this.id = id;
            this.title = title;
        }
        public static ContentDetailResponseInorder toDto(InOrder inOrder){
            Content content = inOrder.getRootContent();
            return ContentDetailResponseInorder.builder()
                    .id(content.getId())
                    .title(content.getTitle())
                    .build();
        }
    }
}
