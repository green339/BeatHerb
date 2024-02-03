package store.beatherb.restapi.content.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Data
@Builder
public class ContentUploadRequest {

    @NotNull(message = "제목은 꼭 필요합니다.")
    String title;
    @Builder.Default
    String lyrics = "가사가 없습니다.";
    @Builder.Default
    String describe = "설명이 없습니다.";
    @NotEmpty(message = "최소 한개 이상의 해시태그가 있어야 합니다.")
    Set<Long> hashTagIds;
    Set<Long> creatorIds;
    MultipartFile image;
    @NotNull(message = "음악은 필수 업로드 하셔야합니다.")
    MultipartFile music;

    @Override
    public String toString() {
        return "ContentUploadRequest{" +
                "title='" + title + '\'' +
                ", lyrics='" + lyrics + '\'' +
                ", describe='" + describe + '\'' +
                ", hashTagIds=" + hashTagIds +
                ", creatorIds=" + creatorIds +
                ", image=" + image +
                '}';
    }
}
