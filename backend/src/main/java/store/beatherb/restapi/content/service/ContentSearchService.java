package store.beatherb.restapi.content.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.domain.ContentSearchRepository;
import store.beatherb.restapi.content.dto.request.SearchRequest;
import store.beatherb.restapi.content.dto.response.SearchResultResponse;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContentSearchService {
    private final ContentSearchRepository contentSearchRepository;
    public SearchResultResponse search(SearchRequest searchRequest) {
        return SearchResultResponse.builder()
                .contents(contentSearchRepository.findByDetail(searchRequest))
                .build();
    }
}
