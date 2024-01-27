package store.beatherb.restapi.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByKakao(String sub);
    Optional<Member> findByNaver(String sub);
    Optional<Member> findByGoogle(String sub);

}
