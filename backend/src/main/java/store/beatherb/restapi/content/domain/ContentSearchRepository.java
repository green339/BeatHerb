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
import static store.beatherb.restapi.content.domain.QContentHashTag.contentHashTag;
import static store.beatherb.restapi.content.domain.QHashTag.hashTag;

@Repository
@RequiredArgsConstructor
public class ContentSearchRepository {
    private final EntityManager em;
    public List<Content> findByDetail(SearchRequest searchRequest){
        JPAQueryFactory jpaQueryFactory=new JPAQueryFactory(em);
        return jpaQueryFactory.selectFrom(content)
                .leftJoin(contentHashTag).on(content.eq(contentHashTag.content))
                .leftJoin(hashTag).on(hashTag.eq(contentHashTag.hashTag))
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
        return content.title.contains(keyword);
    }

    private BooleanBuilder makeBuilder(String[] detail){
        BooleanBuilder booleanBuilder=new BooleanBuilder();
        if(detail==null){
            return booleanBuilder;
        }
        for(String d:detail){
            booleanBuilder.or(hashTag.name.eq(d));
        }
        return booleanBuilder;
    }
}
