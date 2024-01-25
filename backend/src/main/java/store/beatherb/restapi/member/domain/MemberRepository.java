package store.beatherb.restapi.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import store.beatherb.restapi.auth.dto.request.AuthJoinRequest;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {

    List<Member> findByEmail(String email);
    Member findBySub(String sub,String email);

}
