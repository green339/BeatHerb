package store.beatherb.restapi.live.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.global.auth.domain.LoginUser;
import store.beatherb.restapi.global.response.ApiResponse;
import store.beatherb.restapi.live.domain.Live;
import store.beatherb.restapi.live.domain.dto.request.LiveCreateRequest;
import store.beatherb.restapi.live.service.LiveService;
import store.beatherb.restapi.member.dto.MemberDTO;
import store.beatherb.restapi.openvidu.property.OpenviduProperties;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/live")
public class LiveController {
    private final LiveService liveService;

    private final OpenviduProperties openviduProperties;
    private final WebClient openviduWebClient;

    @GetMapping("{id}")
    public ResponseEntity<Live> liveDetail(@PathVariable Long id){
        Live live = liveService.liveDetail(id);

        return ResponseEntity.ok(live);
    }
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createLive(@LoginUser MemberDTO memberDTO,@Valid @RequestBody LiveCreateRequest liveCreateRequest){

        liveService.createLive(memberDTO,liveCreateRequest);
        return ResponseEntity.ok(ApiResponse.successWithoutData());

    }
    @GetMapping
    public ResponseEntity<String> test(){
        openviduWebClient.method(HttpMethod.POST);
        return ResponseEntity.ok(openviduProperties.getDefaultHeader());
    }
}
