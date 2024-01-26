package store.beatherb.restapi.member.domain;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

@Slf4j
@NoArgsConstructor(access = AccessLevel.NONE) //PROTECTED 이거 밖에서하면 access가 안돼요...
@Entity
@Table(name="member", uniqueConstraints = {@UniqueConstraint(
        name = "MEMBERID_UNIQUE",
        columnNames = {"memberId"}
)})
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "advertise")
    private Boolean advertise;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;

    @Column(name = "picture")
    private String picture;

    @Column(name = "member_id")
    private String memberId;

    @Column(name="dm_agree")
    private boolean dmAgree;

    @Column(name="sub")
    private String sub;
}

