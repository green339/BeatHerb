package store.beatherb.restapi.member.domain;

import org.springframework.data.repository.CrudRepository;
import store.beatherb.restapi.member.domain.Member;

import java.util.Optional;

public interface MemberRepository extends CrudRepository<Member, Long> {
    Optional<Member> findById(Long id);
}
