package store.beatherb.restapi.directmessage.controller;


import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import store.beatherb.restapi.directmessage.domain.dto.request.DirectMessageRequest;
import store.beatherb.restapi.directmessage.domain.dto.response.DirectMessageResponse;
import store.beatherb.restapi.directmessage.service.DirectMessageService;
import store.beatherb.restapi.global.auth.domain.LoginUser;
import store.beatherb.restapi.global.response.ApiResponse;
import store.beatherb.restapi.member.dto.MemberDTO;

@RestController
@RequestMapping("/dm")
@RequiredArgsConstructor
public class DirectMessageController {

    private final DirectMessageService directMessageService;


    @PostMapping
    public ResponseEntity<ApiResponse<DirectMessageResponse>> sendDirectMessage(@LoginUser MemberDTO memberDTO,
                                                                  @Valid @RequestBody DirectMessageRequest directMessageRequest){


        DirectMessageResponse directMessageResponse = directMessageService.sendDirectMessage(memberDTO,directMessageRequest);
        ApiResponse<DirectMessageResponse> apiResponse = ApiResponse.of(200,directMessageResponse);
        return ResponseEntity.ok(apiResponse);
    }

}
