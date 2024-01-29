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

    @Builder
    public ContentHashtag(long hashtagId, Content content) {
        this.hashtagId = hashtagId;
        this.content = content;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private long id;

    /*
    TODO: 해시태그 테이블이랑 연관관계 설정
     */
    @Column(name="hashtag_id")
    private long hashtagId;

    @ManyToOne
    @JoinColumn(name="content_id")
    private Content content;
}
