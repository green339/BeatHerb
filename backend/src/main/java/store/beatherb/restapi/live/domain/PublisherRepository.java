package store.beatherb.restapi.live.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import store.beatherb.restapi.member.domain.Member;

import java.util.Optional;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    Optional<Publisher> findByMember(Member member);
}
