package store.beatherb.restapi.content.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
public class ContentUploadRequest {

    @NotNull(message = "제목은 꼭 필요합니다.")
    String title;
    String lyrics = "가사가 없습니다.";
    String describe = "설명이 없습니다.";
    @NotEmpty(message = "최소 한개 이상의 해시태그가 있어야 합니다.")
    List<Integer> hashTags;
    List<Integer> featuring;



}
