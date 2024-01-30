package store.beatherb.restapi.content.service;

import com.querydsl.core.QueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.dto.request.SearchRequest;
import store.beatherb.restapi.content.dto.response.SearchResultResponse;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.QMember;

import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContentSearchService {

    public SearchResultResponse search(SearchRequest searchRequest) {
        log.info(Arrays.toString(searchRequest.getGenre()));
        /*
        TODO: 쿼리 검색 로직 w/QueryDSL
         */

        return null;
    }
}
