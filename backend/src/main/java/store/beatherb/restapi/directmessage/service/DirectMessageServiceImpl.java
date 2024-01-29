package store.beatherb.restapi.directmessage.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.directmessage.domain.DirectMessage;
import store.beatherb.restapi.directmessage.domain.DirectMessageRepository;
import store.beatherb.restapi.directmessage.domain.dto.response.DirectMessageResponse;
import store.beatherb.restapi.infrastructure.kafka.service.KafkaProducerService;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.member.dto.MemberDTO;
import store.beatherb.restapi.member.exception.MemberErrorCode;
import store.beatherb.restapi.member.exception.MemberException;

@Service
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public class DirectMessageServiceImpl implements DirectMessageService{

    private final MemberRepository memberRepository;
    private final DirectMessageRepository directMessageRepository;
    private final KafkaProducerService kafkaProducerService;


    @Override
    public void sendDirectMessage(MemberDTO senderDTO, MemberDTO receiverDTO, String message) throws JsonProcessingException {

        Member sender =  memberRepository.findById(senderDTO.getId()).orElseThrow(
                ()->{
                    return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                }
        );
        Member receiver = memberRepository.findById(receiverDTO.getId()).orElseThrow(()->{
            return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
        });

        DirectMessage directMessage = DirectMessage.builder()
                .sender(sender)
                .message(message)
                .receiver(receiver)
                .build();

        directMessageRepository.save(directMessage);


        DirectMessageResponse directMessageResponse = DirectMessageResponse.toDTO(directMessage);

        ObjectMapper objectMapper = new ObjectMapper();
        String directMessageResponseJson = objectMapper.writeValueAsString(directMessageResponse);


        kafkaProducerService.sendDirectMessage(directMessageResponseJson);

    }
}
