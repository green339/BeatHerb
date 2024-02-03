package store.beatherb.restapi.directmessage.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.directmessage.domain.DirectMessage;
import store.beatherb.restapi.directmessage.domain.DirectMessageRepository;
import store.beatherb.restapi.directmessage.domain.dto.request.DirectMessageRequest;
import store.beatherb.restapi.directmessage.domain.dto.response.DirectMessageResponse;
import store.beatherb.restapi.infrastructure.kafka.domain.dto.response.DirectMessageToKafkaResponse;
import store.beatherb.restapi.directmessage.exception.DirectMessageErrorCode;
import store.beatherb.restapi.directmessage.exception.DirectMessageException;
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

    @Transactional
    @Override
    public DirectMessageResponse sendDirectMessage (MemberDTO senderDTO, DirectMessageRequest directMessageRequest)  {

        Member sender =  memberRepository.findById(senderDTO.getId()).orElseThrow(
                ()->{
                    return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                }
        );

        Member receiver = memberRepository.findById(directMessageRequest.getReceiverId()).orElseThrow(()->{
            return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
        });
        if(sender == receiver){
            throw new DirectMessageException(DirectMessageErrorCode.SENDER_EQUAL_RECEIVER);
        }
        if(!receiver.isDmAgree()){
            throw new DirectMessageException(DirectMessageErrorCode.RECEIVER_NOT_ALLOW_DIRECT_MESSAGE);
        }

        DirectMessage directMessage = DirectMessage.builder()
                .sender(sender)
                .message(directMessageRequest.getMessage())
                .receiver(receiver)
                .build();

        directMessageRepository.saveAndFlush(directMessage);



        DirectMessageToKafkaResponse directMessageToKafkaResponse = DirectMessageToKafkaResponse.toDTO(directMessage);

        ObjectMapper objectMapper = new ObjectMapper();
        try {

            String directMessageResponseJson = objectMapper.writeValueAsString(directMessageToKafkaResponse);
            kafkaProducerService.sendDirectMessage(directMessageResponseJson);

            return DirectMessageResponse.builder()
                    .createdAt(directMessage.getCreatedAt())
                    .build();

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new DirectMessageException(DirectMessageErrorCode.DIRECT_MESSAGE_SEND_FAIL);
        }



    }


}
