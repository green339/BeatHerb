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

    @Query("select distinct c from Content c left join ContentHashTag h where c = h.content and h.hashTag in :hashtags")
    List<Content> findByHashtags(@Param("hashtags") List<HashTag> hashtags);

    @Query("select distinct c from Content c left join ContentHashTag h where c = h.content and h.hashTag in :hashtags and c.title = :title")
    List<Content> findByTitleAndHashtags(@Param("title") String title, @Param("hashtags") List<HashTag> hashtags);
}
