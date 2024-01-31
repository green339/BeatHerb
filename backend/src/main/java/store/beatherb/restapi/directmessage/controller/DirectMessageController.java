package store.beatherb.restapi.directmessage.controller;


import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import store.beatherb.restapi.directmessage.domain.dto.request.DirectMessageRequest;
import store.beatherb.restapi.directmessage.domain.dto.response.DirectMessageResponse;
import store.beatherb.restapi.directmessage.service.DirectMessageService;
import store.beatherb.restapi.global.auth.domain.LoginUser;
import store.beatherb.restapi.member.dto.MemberDTO;

@RestController
@RequiredArgsConstructor
public class DirectMessageController {

    private final DirectMessageService directMessageService;


    @PostMapping("/DM")
    public ResponseEntity<DirectMessageResponse> sendDirectMessage(@LoginUser MemberDTO memberDTO,
                                                                  @Valid @RequestBody DirectMessageRequest directMessageRequest){


        DirectMessageResponse directMessageResponse = directMessageService.sendDirectMessage(memberDTO,directMessageRequest);
        return ResponseEntity.ok(directMessageResponse);
    }

}
