package store.beatherb.restapi.content.service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.content.dto.request.SearchRequest;
import store.beatherb.restapi.content.dto.response.SearchResultResponse;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static store.beatherb.restapi.content.domain.QContent.content;
import static store.beatherb.restapi.content.domain.QContentHashtag.contentHashtag;
import static store.beatherb.restapi.content.domain.QHashtag.hashtag;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContentSearchService {
    private final EntityManager em;
    public SearchResultResponse search(SearchRequest searchRequest) {
        JPAQueryFactory jpaQueryFactory=new JPAQueryFactory(em);
        List<Content> contents = jpaQueryFactory.selectFrom(content)
                .leftJoin(contentHashtag).on(content.eq(contentHashtag.content))
                .leftJoin(hashtag).on(hashtag.eq(contentHashtag.hashtag))
                .where(
                        makeBuilder(searchRequest.getGenre()),
                        makeBuilder(searchRequest.getBpm()),
                        makeBuilder(searchRequest.getInstrument()),
                        makeBuilder(searchRequest.getKeyNote()),
                        keywordContain(searchRequest.getKeyword())
                )
                .fetch();
        return SearchResultResponse.builder().contents(contents).build();
    }

    private BooleanExpression keywordContain(String keyword) {
        return content.name.contains(keyword);
    }

    private BooleanBuilder makeBuilder(String[] detail){
        BooleanBuilder booleanBuilder=new BooleanBuilder();
        if(detail==null){
            return booleanBuilder;
        }
        for(String d:detail){
            booleanBuilder.or(hashtag.hashtagName.eq(d));
        }
        return booleanBuilder;
    }

}
