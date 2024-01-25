package store.beatherb.restapi.auth.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import store.beatherb.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum AuthErrorCode implements ErrorCode {
    MEMBER_EXIST(409,"AUTH_01","이메일로 이미 가입한 회원입니다."),
    MEMBER_IS_NOT_EXIST(400,"AUTH_02","해당 이메일로 가입한 회원이 없습니다."),

    //oauth관련
    NAVER_024_ERROR(401,"AUTH_102","Authentication failed / 인증에 실패했습니다."),
    NAVER_028_ERROR(401,"AUTH_103","Authentication header not exists / OAuth 인증 헤더(authorization header)가 없습니다."),
    NAVER_403_ERROR(403,"AUTH_104","Forbidden / 호출 권한이 없습니다."),
    NAVER_404_ERROR(404,"AUTH_105","Not Found / 검색 결과가 없습니다."),
    NAVER_500_ERROR(500,"AUTH_106","Internal Server Error / 데이터베이스 오류입니다."),
    NAVER_INVALID_REQUEST_ERROR(400,"AUTH_107","파라미터가 잘못되었거나 요청문이 잘못되었습니다."),
    NAVER_UNAUTHORIZED_CLIENT(401,"AUTH_108","인증받지 않은 인증 코드(authorization code)로 요청했습니다."),
    NAVER_UNSUPPORTED_RESPONSE_TYPE_ERROR(400,"AUTH_109","정의되지 않은 반환 형식으로 요청했습니다."),
    NAVER_SERVER_ERROR(500,"AUTH_110","네이버 인증 서버의 오류로 요청을 처리하지 못했습니다.");

    private final int statusCode;
    private final String errorCode;
    private final String message;

}
