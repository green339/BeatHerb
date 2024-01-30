package store.beatherb.restapi.content.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import store.beatherb.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum ContentErrorCode implements ErrorCode {
    LIST_HAS_NOT_CONTENT(404, "CONT_01", "리스트에 컨텐트가 담겨 있지 않습니다.");

    private final int statusCode;
    private final String errorCode;
    private final String message;
}
