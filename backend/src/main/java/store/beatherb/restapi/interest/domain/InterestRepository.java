package store.beatherb.restapi.interest.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InterestRepository extends JpaRepository<Interest, Long> {
    Optional<Interest> findByMemberIdAndHashTagId(Long memberId, Long hashTagId);
}
