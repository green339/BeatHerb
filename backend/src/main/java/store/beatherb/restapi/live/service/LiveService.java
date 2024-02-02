package store.beatherb.restapi.live.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.live.domain.Live;
import store.beatherb.restapi.live.domain.LiveRepository;
import store.beatherb.restapi.live.exception.LiveErrorCode;
import store.beatherb.restapi.live.exception.LiveException;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LiveService {
    private final LiveRepository liveRepository;

    public Live liveDetail(Long id){
        Live live = liveRepository.findById(id).orElseThrow(() -> new LiveException(LiveErrorCode.LIVE_IS_NOT_EXIST));

        return live;
    }
}
