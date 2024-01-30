package store.beatherb.socket.websocket.directmessage.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;


import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
public class DirectMessageResponse {


    Long id;
    String type="DM";
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

    @JsonSerialize
    public static class ReceiverExclusionMixin {
        @JsonIgnore
        private DMMember receiver;

        @JsonIgnore
        private Long id;
    }

}
