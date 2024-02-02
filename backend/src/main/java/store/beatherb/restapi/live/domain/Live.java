package store.beatherb.restapi.live.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import store.beatherb.restapi.member.domain.Member;

import java.time.LocalDateTime;

@Slf4j
@Entity
@Table(name="live")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class Live {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @OneToOne
    @JoinColumn(name="owner_id")
    private Member member;

    @Column(name="title")
    private String title;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="watcher")
    private Long watcher;

    @Column(name="describe")
    private String describe;

    @Builder
    public Live(Member member, String title, LocalDateTime createdAt, Long watcher, String describe){
        this.member = member;
        this.title = title;
        this.createdAt = createdAt;
        this.watcher = watcher;
        this.describe = describe;
    }
}
