package store.beatherb.restapi.live.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.member.domain.Member;


@Entity
@NoArgsConstructor
@Getter
public class Publisher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", unique = true)
    Member member;

    @Setter
    @ManyToOne
    @JoinColumn(name = "live_id")
    Live live;

    @Setter
    @Column
    private boolean agree;

    @Builder
    public Publisher(Member member, Live live, boolean agree) {
        this.member = member;
        this.live = live;
        this.agree = agree;
    }


}
