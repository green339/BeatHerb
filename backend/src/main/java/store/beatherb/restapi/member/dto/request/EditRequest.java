package store.beatherb.restapi.member.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class EditRequest {
    @NotNull(message="dm 수신 여부는 반드시 체크")
    public boolean dmAgree;
    @NotNull(message="닉네임은 반드시 설정")
    public String nickname;
    // 추후 파일 업로드하는 방법 확인 필요
    public String picture;

}