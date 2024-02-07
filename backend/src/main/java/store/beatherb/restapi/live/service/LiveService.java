package store.beatherb.restapi.live.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.live.domain.Live;
import store.beatherb.restapi.live.domain.LiveRepository;
import store.beatherb.restapi.live.domain.dto.request.LiveCreateRequest;
import store.beatherb.restapi.live.exception.LiveErrorCode;
import store.beatherb.restapi.live.exception.LiveException;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.member.dto.MemberDTO;
import store.beatherb.restapi.member.exception.MemberErrorCode;
import store.beatherb.restapi.member.exception.MemberException;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LiveService {
    private final LiveRepository liveRepository;
    private final MemberRepository memberRepository;
    private final WebClient openviduWebClient;

    @Transactional
    public Live liveDetail(Long id) {
        Live live = liveRepository.findById(id).orElseThrow(() -> new LiveException(LiveErrorCode.LIVE_IS_NOT_EXIST));

        return live;
    }

    @Transactional
    public void createLive(MemberDTO memberDTO, LiveCreateRequest liveCreateRequest) {

        Member member = memberRepository.findById(memberDTO.getId()).orElseThrow(
                () -> {
                    return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                }
        );
        liveRepository.findByMember(member).ifPresent(m -> {
            throw new LiveException(LiveErrorCode.LIVE_ALREADY_EXIST);
        });

        Live live = Live.builder()
                .member(member)
                .title(liveCreateRequest.getTitle())
                .describe(liveCreateRequest.getDescribe())
                .build();

        liveRepository.save(live);
        //여기서 webClient 해보기





        return;
    }


}
