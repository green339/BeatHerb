package store.beatherb.restapi.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member,Long> {

    List<Member> findByEmail(String email);
    Member findBySub(String sub);

}
