package store.beatherb.restapi.content.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import store.beatherb.restapi.member.domain.Member;

import java.time.LocalDateTime;
import java.util.Set;

@Slf4j
@Entity
@Table(name="content")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @ManyToOne
    @JoinColumn(name="content_writer_id")
    private Member writer;

    @ManyToOne
    @JoinColumn(name="content_type_id")
    private ContentType contentType;


    @ManyToMany
    @JoinTable(
            name = "content_hashtags",
            joinColumns = @JoinColumn(name = "content_id"),
            inverseJoinColumns = @JoinColumn(name = "hashtag_id")
    )
    private Set<HashTag> hashTags;


    @Column(name="lyrics")
    private String lyrics;

    @Column(name="describe")
    private String describe;

    @Column(name="hit")
    private int hit;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Builder
    public Content(ContentType contentType, String lyrics, String describe, int hit, LocalDateTime createdAt) {
        this.contentType = contentType;
        this.lyrics = lyrics;
        this.describe = describe;
        this.hit = hit;
        this.createdAt = createdAt;
    }
}
