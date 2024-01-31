package store.beatherb.restapi.global.exception;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import store.beatherb.restapi.global.exception.dto.response.ExceptionResponse;
import store.beatherb.restapi.global.response.ApiResponse;

@RestControllerAdvice
public class ControllerExceptionAdvice {

    @ExceptionHandler(BeatHerbException.class)
    public ResponseEntity<ExceptionResponse> handleException(BeatHerbException e) {
        int statusCode = e.getStatusCode();
        ExceptionResponse response = ExceptionResponse.from(e.getMessage());

        return ResponseEntity.status(statusCode).body(response);
    }
//    @ExceptionHandler(BeatHerbException.class)
//    public ApiResponse<?> handleException(BeatHerbException e) {
//        return ApiResponse.fail(e.getErrorCode(),e.getMessage());
//    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException e){

        //TODO : 리팩토링 필요
        ExceptionResponse response = ExceptionResponse.from("입력을 확인해주세요.");

        return ResponseEntity.status(400).body(response);
    }
}
