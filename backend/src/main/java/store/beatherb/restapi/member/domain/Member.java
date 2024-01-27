package store.beatherb.restapi.member.domain;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

@Slf4j

@Entity
@Table(name="member", uniqueConstraints = {@UniqueConstraint(
        name = "MEMBERID_UNIQUE",
        columnNames = {"memberId"}
)})
@Getter
@Setter
// conflict나면 이부분은 그냥 내가 builder패턴으로 만들려고 한거니까 원래 만든거로 써도됨 -> 근데 필드에 naver, kakao, google은 추가해주세요
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED) //PROTECTED 이거 밖에서하면 access가 안돼요...
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

    @Column(name="naver")
    private String naver;

    @Column(name="kakao")
    private String kakao;

    @Column(name="google")
    private String google;
}

