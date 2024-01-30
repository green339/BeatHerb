package store.beatherb.restapi.content.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import store.beatherb.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum ContentErrorCode implements ErrorCode {
    CONTENT_ERROR_CODE(400, "CONT_01", "컨텐츠가 존재하지 않습니다."),
    LIST_HAS_NOT_CONTENT(404, "CONT_02", "리스트에 컨텐트가 담겨 있지 않습니다."),
    LIST_HAS_NOT_COMMENT(404, "CONT_03", "리스트에 코멘트가 담겨 있지 않습니다.");


    private final int statusCode;
    private final String errorCode;
    private final String message;
}
