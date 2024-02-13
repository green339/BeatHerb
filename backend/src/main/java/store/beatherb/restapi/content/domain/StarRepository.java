package store.beatherb.restapi.content.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import store.beatherb.restapi.member.domain.Member;

import java.util.Optional;

@Repository
public interface StarRepository extends JpaRepository<Star, Long> {
    Optional<Star> findByContentIdAndMemberId(Long contentId, Long memberId);
    Optional<Star> findByContentAndMember(Content content, Member member);
}
