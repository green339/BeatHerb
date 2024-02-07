package store.beatherb.restapi.content.domain;


import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import store.beatherb.restapi.content.dto.CommentDTO;
import store.beatherb.restapi.content.dto.ContentDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static store.beatherb.restapi.content.domain.QComment.comment;
import static store.beatherb.restapi.content.domain.QContent.content;
import static store.beatherb.restapi.content.domain.QContentHashTag.contentHashTag;
import static store.beatherb.restapi.content.domain.QContentType.contentType;
import static store.beatherb.restapi.content.domain.QCreator.creator1;
import static store.beatherb.restapi.content.domain.QInorder.inorder;
import static store.beatherb.restapi.content.domain.QStar.star;

@Repository
@RequiredArgsConstructor
public class ContentDetailRepository {
    private final EntityManager em;
    CommentRepository commentRepository;

    // content - inorder, contenttype, contenthashtag, creator
    // comment, livecontent, outorder, star(favorite)
    public List<ContentDetailList> findDetailById(Long id){
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(em);

        List<Content> contents =  jpaQueryFactory.selectFrom(content)
                .leftJoin(contentHashTag).on(content.eq(contentHashTag.content))
                .leftJoin(inorder).on(content.eq(inorder.content))
                .leftJoin(creator1).on(content.eq(creator1.content))
                .leftJoin(contentType).on(contentType.eq(content.contentType))
                .leftJoin(star).on(content.eq(star.content))
                .where(
                        content.id.eq(id)
                )
                .fetch();

        List<ContentDetailList> returns = new ArrayList<>();
        for (Content content : contents) {
            List<Comment> comments = commentRepository.findByContent(content).orElse(new ArrayList<>());
            List<CommentDTO> commentDTOs = new ArrayList<>();
            for (Comment c : comments){
                CommentDTO dto = CommentDTO.toDto(c);
                commentDTOs.add(dto);
            }
            returns.add(ContentDetailList.toDto(content, commentDTOs));
        }
        return returns;
    }
}