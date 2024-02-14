package store.beatherb.restapi.content.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, Long> {
    Optional<List<Content>> findAllByOrderByHitDesc();
    List<Content> findByTitleContains(String title);
//    List<Content> findByContentHashTagList(List<ContentHashTag> contentHashTags);

    @Query("select distinct c from Content c left join c.contentHashTagList h where c = h.content and h.hashTag.id in :hashTagIds")
    List<Content> findByHashtags(@Param("hashTagIds") List<Long> hashTagIds);

    @Query("select distinct c from Content c left join c.contentHashTagList h where c = h.content and h.hashTag.id in :hashTagIds and c.title = :title")
    List<Content> findByTitleAndHashtags(@Param("title") String title, @Param("hashTagIds") List<Long> hashTagIds);
}
