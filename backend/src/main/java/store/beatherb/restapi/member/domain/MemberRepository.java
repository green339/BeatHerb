package store.beatherb.restapi.member.domain;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import store.beatherb.restapi.member.dto.request.MemberJoinRequest;

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

    public void insertMember(MemberJoinRequest memberJoinRequest){
        Member member=new Member();
        member.setEmail(memberJoinRequest.getEmail());
        if(memberJoinRequest.getIdentifier()!=null){
            member.setSub(memberJoinRequest.getIdentifier());
        }
        em.persist(member);
    }

    public void updateEmail(String email,Long id){

    }
}
