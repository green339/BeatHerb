package store.beatherb.restapi.member.domain;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="member", uniqueConstraints = {@UniqueConstraint(
        name = "MEMBERID_UNIQUE",
        columnNames = {"memberId"}
)})
@Getter
@Setter
public class Member {
    @Builder
    public Member(String email, String name, String nickname, Boolean advertise, Date created_at, Date updated_at, String picture, String memberId, boolean dmAgree) {
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.advertise = advertise;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.picture = picture;
        this.memberId = memberId;
        this.dmAgree = dmAgree;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "nickname", nullable = false, length = 255)
    private String nickname;

    @Column(name = "advertise", nullable = false)
    private Boolean advertise;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;

    @Column(name = "picture", nullable = false)
    private String picture;

    @Column(name = "member_id", nullable = false)
    private String memberId;

    @Column(name="dm_agree")
    private boolean dmAgree;
}

