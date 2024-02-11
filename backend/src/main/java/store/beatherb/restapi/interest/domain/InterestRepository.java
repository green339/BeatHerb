package store.beatherb.restapi.interest.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import store.beatherb.restapi.content.domain.HashTag;

import java.util.List;
import java.util.Optional;

public interface InterestRepository extends JpaRepository<Interest, Long> {
    Optional<Interest> findByMemberIdAndHashTagId(Long memberId, Long hashTagId);
    List<Interest> findByHashTag(HashTag hashTag);
}
