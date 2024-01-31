package store.beatherb.restapi.member.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import store.beatherb.restapi.global.exception.ErrorCode;


@Getter
@AllArgsConstructor
public enum MemberErrorCode implements ErrorCode {
    EMAIL_EXIST(409,"MEM_01","이미 가입한 이메일입니다."),
    EMAIL_IS_NOT_EXIST(400,"MEM_02","해당 이메일로 가입한 회원이 없습니다."),
    EMAIL_IS_NOT_VALID(400, "MEM_03", "올바르지 않은 이메일 형식입니다."),
    SOCIAL_IS_NOT_EXIST(400,"MEM_04","이메일과 연동안된 소셜 정보입니다."),
    SOCIAL_EXIST(409, "MEM_05", "해당 소셜 계정으로 연동된 이메일이 존재합니다."),

    MEMBER_FIND_ERROR(400, "MEM_06", "해당 회원을 찾을수 없습니다.");
    private final int statusCode;
    private final String errorCode;
    private final String message;
}
