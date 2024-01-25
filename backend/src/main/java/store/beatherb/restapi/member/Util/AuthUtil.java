package store.beatherb.restapi.member.Util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import store.beatherb.restapi.member.dto.OIDCDto;

import java.util.Base64;

@Slf4j
public class AuthUtil {
    public static OIDCDto payloadDecoder(String jwtPayload) {
        try{
            String payload= new String(Base64.getUrlDecoder().decode(jwtPayload));
            ObjectMapper mapper=new ObjectMapper().configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES,false);
            return mapper.readValue(payload,OIDCDto.class);
        }catch(JsonProcessingException e){
            log.info(e.getMessage());
        }
        return null; // 에러코드 보내기
    }
}
