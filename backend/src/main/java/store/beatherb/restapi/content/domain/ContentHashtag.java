package store.beatherb.restapi.content.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Table(name="content_hashtag")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentHashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private long id;

    /*
    TODO: 해시태그 테이블이랑 연관관계 설정
     */
    @ManyToOne
    @JoinColumn(name="hashtag_id")
    private Hashtag hashtag;

    @ManyToOne
    @JoinColumn(name="content_id")
    private Content content;

    @Builder
    public ContentHashtag(Hashtag hashtag, Content content) {
        this.hashtag = hashtag;
        this.content = content;
    }
}
