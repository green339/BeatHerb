package store.beatherb.restapi.follow.follower.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import store.beatherb.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum FollowerErrorCode implements ErrorCode {
    FOLLOWER_FIND_ERROR(400, "FOLLOW_01", "팔로워 정보를 찾을 수 없습니다."),
    FOLLOWER_LIST_IS_NULL(400, "FOLLOW_02", "팔로워 리스트가 NULL입니다.");

    private int statusCode;
    private String errorCode;
    private String message;
}
