package store.beatherb.restapi.directmessage.domain.dto.request;


import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DirectMessageRequest {

    @NotNull
    Long receiverId;
    @NotNull
    String message;

//    public DirectMessageRequest(Long receiverId, String message) {
//        this.receiverId = receiverId;
//        this.message = message;
//        if (receiverId == null || message == null){
//            throw new D
//        }
//    }
}
