package store.beatherb.restapi.member.dto;

import lombok.Data;

@Data
public class ProviderAuthUserInfoDto {
    //제공자, 이메일, 식별자
    String provider;
    String email;
    String identifier;
}
