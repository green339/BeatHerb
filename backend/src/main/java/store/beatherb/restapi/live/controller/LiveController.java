package store.beatherb.restapi.live.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import store.beatherb.restapi.live.domain.Live;
import store.beatherb.restapi.live.service.LiveService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/live")
public class LiveController {
    private final LiveService liveService;

    @GetMapping("{id}")
    public ResponseEntity<Live> liveDetail(@PathVariable Long id){
        Live live = liveService.liveDetail(id);

        return ResponseEntity.ok(live);
    }
}
