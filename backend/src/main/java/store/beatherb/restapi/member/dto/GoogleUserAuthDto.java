package store.beatherb.restapi.member.dto;

import lombok.Data;
import lombok.ToString;

@Data
public class GoogleUserAuthDto {
    //access token, refresh token, id token
    String access_token;
    int expires_in;
    String id_token;
    String scope;
}
