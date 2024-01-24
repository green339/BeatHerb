package store.beatherb.restapi.member.dto;

import lombok.Data;

@Data
public class NaverUserAuthDto {
    //access token, refresh token
    String access_token;
    String refresh_token;
    String token_type;
    int expires_in;

}
