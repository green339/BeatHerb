package store.beatherb.restapi.member.domain;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

@Slf4j

@Entity
@Table(name="member")
@Getter
@Setter
// conflict나면 이부분은 그냥 내가 builder패턴으로 만들려고 한거니까 원래 만든거로 써도됨 -> 근데 필드에 naver, kakao, google은 추가해주세요
@NoArgsConstructor(access = AccessLevel.PROTECTED) //PROTECTED 이거 밖에서하면 access가 안돼요...
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", nullable = false, length = 255, unique = true)
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

    @Column(name = "picture", nullable = true)
    private String picture;

    @Column(name="dm_agree")
    private boolean dmAgree;

    @Column(name="naver")
    private String naver;

    @Column(name="kakao")
    private String kakao;

    @Column(name="google")
    private String google;


    @Builder
    public Member(String email, String name, String nickname, Boolean advertise, Date created_at, Date updated_at, String picture, boolean dmAgree, String naver, String kakao, String google) {
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.advertise = advertise;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.picture = picture;
        this.dmAgree = dmAgree;
        this.naver = naver;
        this.kakao = kakao;
        this.google = google;
    }
}

