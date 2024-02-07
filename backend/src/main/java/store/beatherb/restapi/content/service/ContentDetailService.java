package store.beatherb.restapi.content.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.domain.ContentDetailRepository;
import store.beatherb.restapi.content.dto.request.ContentDetailRequest;
import store.beatherb.restapi.content.dto.response.ContentDetailResponse;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContentDetailService {
    private final ContentDetailRepository contentDetailRepository;

    public ContentDetailResponse detail(ContentDetailRequest contentDetailRequest){
        return ContentDetailResponse.builder()
                .contentDetails(contentDetailRepository.findDetailById(contentDetailRequest.getId()))
                .build();
    }
}
