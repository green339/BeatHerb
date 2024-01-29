package store.beatherb.restapi.oauth.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import store.beatherb.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum OAuthErrorCode implements ErrorCode {
    FAIL_TO_GET_INFO(500, "AUTH_01", "소셜인증 과정에서 문제가 발생했습니다.");

    private final int statusCode;
    private final String errorCode;
    private final String message;

}
