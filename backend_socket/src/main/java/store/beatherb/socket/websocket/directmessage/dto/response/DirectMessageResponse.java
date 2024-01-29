package store.beatherb.socket.websocket.directmessage.dto.response;

import lombok.*;


import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
public class DirectMessageResponse {


    Long id;
    DMMember sender;
    DMMember receiver;

    Timestamp createdAt;
    String message;



    @Data
    public static class DMMember{

        @Getter
        private Long id;
        private String nickname;
        private String picture;
    }

}
