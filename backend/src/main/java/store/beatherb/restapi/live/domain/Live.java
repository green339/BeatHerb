package store.beatherb.restapi.live.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import store.beatherb.restapi.content.domain.Creator;
import store.beatherb.restapi.member.domain.Member;

import java.time.LocalDateTime;
import java.util.List;

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

    @OneToMany(mappedBy = "live", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Publisher> publisherList;

    @Builder
    public Live(Member member, String title, LocalDateTime createdAt, Long watcher, String describe, List<Publisher> publisherList) {
        this.member = member;
        this.title = title;
        this.createdAt = createdAt;
        this.watcher = watcher;
        this.describe = describe;
        this.publisherList = publisherList;

        if(this.publisherList !=null){
            for (Publisher p: this.publisherList){
                p.setLive(this);
            }
        }
    }
}
