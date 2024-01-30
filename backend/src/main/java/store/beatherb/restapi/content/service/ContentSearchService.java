package store.beatherb.restapi.content.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.dto.request.SearchRequest;
import store.beatherb.restapi.content.dto.response.SearchResultResponse;

import java.util.Arrays;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContentSearchService {

    public SearchResultResponse search(SearchRequest searchRequest) {
        String[] genre=searchRequest.getGenre().split(" ");
        String[] bpm=searchRequest.getBpm().split(" ");
        String[] keyNote=searchRequest.getKeyNote().split(" ");
        String[] instrument=searchRequest.getInstrument().split(" ");
        String keyword=searchRequest.getKeyword();
        log.info(Arrays.toString(genre));
        /*
        TODO: 쿼리 검색 로직 w/QueryDSL
         */

        return null;
    }
}
