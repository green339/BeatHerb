package store.beatherb.restapi.content.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Slf4j
@Entity
@Table(name="content")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private long id;

    @ManyToOne
    @JoinColumn(name="content_type_id")
    private ContentType contentType;

    @Column(name="media_path")
    private String mediaPath;

    @Column(name="lyrics")
    private String lyrics;

    @Column(name="describe")
    private String describe;

    @Column(name="hit")
    private int hit;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Builder
    public Content(ContentType contentType, String mediaPath, String lyrics, String describe, int hit, LocalDateTime createdAt) {
        this.contentType = contentType;
        this.mediaPath = mediaPath;
        this.lyrics = lyrics;
        this.describe = describe;
        this.hit = hit;
        this.createdAt = createdAt;
    }
}
