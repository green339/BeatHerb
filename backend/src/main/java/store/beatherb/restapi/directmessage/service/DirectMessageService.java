package store.beatherb.restapi.directmessage.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import store.beatherb.restapi.directmessage.domain.dto.request.DirectMessageRequest;
import store.beatherb.restapi.directmessage.domain.dto.response.DirectMessageResponse;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.dto.MemberDTO;

public interface DirectMessageService {

    DirectMessageResponse sendDirectMessage(MemberDTO senderDTO, DirectMessageRequest directMessageRequest) ;
}
