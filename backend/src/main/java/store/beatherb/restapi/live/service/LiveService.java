package store.beatherb.restapi.live.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import store.beatherb.restapi.live.domain.Live;
import store.beatherb.restapi.live.domain.LiveRepository;
import store.beatherb.restapi.live.domain.Publisher;
import store.beatherb.restapi.live.domain.dto.request.LiveCreateRequest;
import store.beatherb.restapi.live.domain.dto.request.LiveJoinRequest;
import store.beatherb.restapi.live.domain.dto.response.LiveJoinResponse;
import store.beatherb.restapi.live.exception.LiveErrorCode;
import store.beatherb.restapi.live.exception.LiveException;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.member.dto.MemberDTO;
import store.beatherb.restapi.member.exception.MemberErrorCode;
import store.beatherb.restapi.member.exception.MemberException;
import store.beatherb.restapi.openvidu.property.OpenviduProperties;
import store.beatherb.restapi.openvidu.property.OpenviduSessionProperties;
import store.beatherb.restapi.openvidu.service.OpenviduService;
import store.beatherb.restapi.openvidu.util.OpenviduConfiguration;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LiveService {
    private final LiveRepository liveRepository;
    private final MemberRepository memberRepository;

    private final OpenviduService openviduService;


    @Transactional
    public Live liveDetail(Long id) {
        Live live = liveRepository.findById(id).orElseThrow(() -> new LiveException(LiveErrorCode.LIVE_IS_NOT_EXIST));

        return live;
    }

    @Transactional
    public LiveJoinResponse createLive(MemberDTO memberDTO, LiveCreateRequest liveCreateRequest) {

        Member member = memberRepository.findById(memberDTO.getId()).orElseThrow(
                () -> {
                    return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                }
        );
        liveRepository.findByMember(member).ifPresent(m -> {
            throw new LiveException(LiveErrorCode.LIVE_ALREADY_EXIST);
        });

        List<Publisher> publisherList = new ArrayList<>();
        for (Long publisherId : liveCreateRequest.getPublisherId()) {
            Member publishMember = memberRepository.findById(publisherId).orElseThrow(
                    () -> {
                        return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                    }
            );
            Publisher publisher = Publisher.builder()
                    .member(publishMember)
                    .build();

            publisherList.add(publisher);
        }
        Live live = Live.builder()
                .member(member)
                .title(liveCreateRequest.getTitle())
                .describe(liveCreateRequest.getDescribe())
                .publisherList(publisherList)
                .build();

        liveRepository.save(live);

        openviduService.createSessionById(live.getId());

        return openviduService.joinSessionByIdAndRole(live.getId(),"PUBLISHER");
        //TODO : httpRequest 날려서 가져오기.
        //https://openvidu.beatherb.store/openvidu/api/sessions


    }

    @Transactional
    public void joinLive(MemberDTO memberDTO, LiveJoinRequest liveJoinRequest){
        Member member = memberRepository.findById(memberDTO.getId()).orElseThrow(
                () -> {
                    return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                }
        );
        Live live = liveRepository.findById(liveJoinRequest.getLiveId()).orElseThrow(
                () -> {
                    return new LiveException(LiveErrorCode.LIVE_IS_NOT_EXIST);
                }
        );
        if(live.getMember() == member){
            throw new LiveException(LiveErrorCode.LIVE_ALREADY_EXIST);
        }
        String role = "SUBSCRIBER";
        for (Publisher p : live.getPublisherList()){
            if(p.getMember() == member){
                role = "PUBLISHER";
                break;
            }
        }
        //여기서 이제 fetch 시작

    }


}
