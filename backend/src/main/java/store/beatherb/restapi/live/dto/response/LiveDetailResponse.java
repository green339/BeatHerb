package store.beatherb.restapi.live.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.List;

@Getter
public class LiveDetailResponse {
    private Long liveId;
    @JsonIgnore
    private Long memberId;
    private String liveTitle;
    private List<String> contentTitleList;
    private String masterName;
    private String image;

    @Builder
    public LiveDetailResponse(Long liveId, Long memberId, String liveTitle, List<String> contentTitleList, String masterName){
        this.liveId = liveId;
        this.memberId = memberId;
        this.liveTitle = liveTitle;
        this.contentTitleList = contentTitleList;
        this.masterName = masterName;
        this.image = "/api/member/image/"+memberId;
    }
}
