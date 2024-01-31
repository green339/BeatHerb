package store.beatherb.restapi.content.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.domain.QContent;
import store.beatherb.restapi.content.dto.request.SearchRequest;
import store.beatherb.restapi.content.dto.response.SearchResultResponse;


import java.util.Arrays;
import java.util.List;

import static store.beatherb.restapi.content.domain.QContent.content;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContentSearchService {
    private final EntityManager em;
    public SearchResultResponse search(SearchRequest searchRequest) {
        log.info(Arrays.toString(searchRequest.getGenre()));
        /*
        TODO: 쿼리 검색 로직 w/QueryDSL
         */

//        JPAQueryFactory jpaQueryFactory=new JPAQueryFactory(em);
//        jpaQueryFactory.select(content)
//                .distinct()
//                .from(content)
//                .join()
//                .join()
//                .where(
//
//                )
//                .fetch();
        return null;
    }
}
