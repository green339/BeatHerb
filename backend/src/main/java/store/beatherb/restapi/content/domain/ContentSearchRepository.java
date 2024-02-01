package store.beatherb.restapi.content.domain;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import store.beatherb.restapi.content.dto.request.SearchRequest;

import java.util.List;

import static store.beatherb.restapi.content.domain.QContent.content;
import static store.beatherb.restapi.content.domain.QContentHashtag.contentHashtag;
import static store.beatherb.restapi.content.domain.QHashtag.hashtag;

@Repository
@RequiredArgsConstructor
public class ContentSearchRepository {
    private final EntityManager em;
    public List<Content> findByDetail(SearchRequest searchRequest){
        JPAQueryFactory jpaQueryFactory=new JPAQueryFactory(em);
        return jpaQueryFactory.selectFrom(content)
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
