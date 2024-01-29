package store.beatherb.restapi.directmessage.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.dto.MemberDTO;

public interface DirectMessageService {

    void sendDirectMessage(MemberDTO sender, MemberDTO receiver,String message) throws JsonProcessingException;
}
