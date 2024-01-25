package store.beatherb.restapi.global.auth.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import store.beatherb.restapi.member.domain.Member;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "auth")
@Getter
@Setter
public class Auth {
    @Builder
    public Auth(Member member, String uuid){
        this.member = member;
        this.uuid = uuid;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "uuid", nullable = false, unique = true)
    private String uuid;
}
