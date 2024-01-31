package store.beatherb.restapi.global.response;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;
    public static<T> ApiResponse<T> successWithData(T data){
        return new ApiResponse<>(200,null,data);
    }
    public static ApiResponse<?> successWithoutData(){
        return new ApiResponse<>(200,null,null);
    }
    public static<T> ApiResponse<T> of(int code,T data){
        return new ApiResponse<>(code,null,data);
    }

    public static ApiResponse<?> fail(int code, String message){
        return new ApiResponse<>(code,message,null);
    }
}
