package store.beatherb.restapi.content.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Star, Long> {
    Optional<Star> findByContentIdAndMemberId(Long contentId, Long memberId);
}
