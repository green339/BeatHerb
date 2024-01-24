package store.beatherb.restapi.member.dto;

import lombok.Data;
import lombok.ToString;

@Data
public class KakaoUserAuthDto {
    //access token, refresh token, id token
    String access_token;
    String token_type;
    String refresh_token;
    String id_token;
    int expires_in;
    String scope;
    int refresh_token_expires_in;

}
