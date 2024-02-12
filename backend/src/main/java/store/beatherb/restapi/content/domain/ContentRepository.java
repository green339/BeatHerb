package store.beatherb.restapi.content.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, Long> {
    Optional<List<Content>> findAllByOrderByHitDesc();
    List<Content> findByTitleContains(String title);
}
