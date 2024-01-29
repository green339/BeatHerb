package store.beatherb.restapi.directmessage.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import store.beatherb.restapi.directmessage.domain.DirectMessage;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.dto.MemberDTO;

import java.sql.Timestamp;

@Getter
public class DirectMessageResponse {

    @Builder
    public DirectMessageResponse(Long id, Member sender, Member receiver, Timestamp createdAt, String message) {
        this.id = id;
        this.sender =
                DMMember.builder().id(sender.getId())
                        .picture(sender.getPicture())
                        .nickname(sender.getNickname())
                        .build();

        this.receiver = DMMember.builder().id(receiver.getId())
                .picture(receiver.getPicture())
                .nickname(receiver.getNickname())
                .build();;
        this.createdAt = createdAt;
        this.message = message;
    }

    public static DirectMessageResponse toDTO(DirectMessage directMessage){
        return DirectMessageResponse.builder()
                .id(directMessage.getId())
                .sender(directMessage.getSender())
                .receiver(directMessage.getReceiver())
                .createdAt(directMessage.getCreatedAt())
                .message(directMessage.getMessage())
                .build();
    }

    Long id;
    DMMember sender;
    DMMember receiver;

    Timestamp createdAt;
    String message;


    @Builder
    @AllArgsConstructor
    @Getter
    static class DMMember{

        private Long id;
        private String nickname;
        private String picture;
    }

}
