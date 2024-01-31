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
    public ResponseEntity<ApiResponse<?>> handleException(BeatHerbException e) {
        int statusCode = e.getStatusCode();
        ApiResponse<?> ErrorResponse = ApiResponse.fail(e.getStatusCode(),e.getMessage());
        return ResponseEntity.status(statusCode).body(ErrorResponse);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleException(MethodArgumentNotValidException e){

        ApiResponse<?> ErrorResponse = ApiResponse.fail(400,"입력을 확인해주세요.");

        return ResponseEntity.status(400).body(ErrorResponse);
    }
}
