package store.beatherb.restapi.interest.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import store.beatherb.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum InterestErrorCode implements ErrorCode {
    INTEREST_IS_NOT_EXIST(400, "INTEREST_01", "해당 관심사가 존재하지 않습니다.");

    private int statusCode;
    private String errorCode;
    private String message;
}
