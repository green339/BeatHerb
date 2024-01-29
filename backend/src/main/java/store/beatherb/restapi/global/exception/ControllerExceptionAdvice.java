package store.beatherb.restapi.global.exception;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import store.beatherb.restapi.global.exception.dto.response.ExceptionResponse;

@RestControllerAdvice
public class ControllerExceptionAdvice {

    @ExceptionHandler(BeatHerbException.class)
    public ResponseEntity<ExceptionResponse> handleException(BeatHerbException e) {
        int statusCode = e.getStatusCode();
        ExceptionResponse response = ExceptionResponse.from(e.getMessage());

        return ResponseEntity.status(statusCode).body(response);
    }
}
