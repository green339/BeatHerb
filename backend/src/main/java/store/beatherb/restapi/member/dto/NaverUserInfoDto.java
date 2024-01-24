package store.beatherb.restapi.member.dto;

import lombok.Data;

@Data
public class NaverUserInfoDto {
    // 이메일 식별자
    String resultcode;
    String message;
    NaverUserInfoResponseDto response;
}
