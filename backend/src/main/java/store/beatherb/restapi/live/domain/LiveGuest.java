package store.beatherb.restapi.live.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import store.beatherb.restapi.member.domain.Member;

@Slf4j
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class LiveGuest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "live_id")
    private Live live;

    @ManyToOne
    @JoinColumn(name = "guest_id")
    private Member member;

    @Column(name = "agree", nullable = false)
    private Boolean agree;

    @Builder
    public LiveGuest(Live live, Member member, Boolean agree){
        this.live = live;
        this.member = member;
        this.agree = agree;
    }
}
