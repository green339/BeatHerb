package store.beatherb.restapi.member.domain;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import store.beatherb.restapi.auth.dto.request.AuthJoinRequest;

@Repository
@RequiredArgsConstructor
public class MemberRepository {
    private final EntityManager em;

    public Member findById(String id){
        return em.find(Member.class, id);
    }
    public Member findByEmail(String email){
        return em.find(Member.class,email);
    }

    public Member findBySub(String sub){
        return em.find(Member.class,sub);
    }

    public void insertMember(AuthJoinRequest authJoinRequest){
        Member member=new Member();
        member.setEmail(authJoinRequest.getEmail());
        if(authJoinRequest.getIdentifier()!=null){
            member.setSub(authJoinRequest.getIdentifier());
        }
        em.persist(member);
    }

    public void updateEmail(String email,Long id){

    }
}
