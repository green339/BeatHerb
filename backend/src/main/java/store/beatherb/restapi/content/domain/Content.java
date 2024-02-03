package store.beatherb.restapi.content.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.cglib.core.Local;
import store.beatherb.restapi.member.domain.Member;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@Entity
@Table(name="content")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //TODO : 추후 복합 등록자 추가.

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Creator> creators;
    @NotNull
    private String title;

    @ManyToOne
    @NotNull
    @JoinColumn(name="content_writer_id")
    private Member writer;

    @ManyToOne
    @JoinColumn(name="content_type_id")
    private ContentType contentType;

    @OneToMany
    private List<Content> inorder;


    @ManyToMany
    @JoinTable(
            name = "content_hashtags",
            joinColumns = @JoinColumn(name = "content_id"),
            inverseJoinColumns = @JoinColumn(name = "hashtag_id")
    )

    @NotNull
    private List<HashTag> hashTags;


    @Column(name="lyrics")
    private String lyrics;

    @Column(name="describe")
    private String describe;

    @Column(name="hit")
    private int hit;

    @CreationTimestamp
    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Builder
    public Content(String title, Member writer, ContentType contentType, List<Content> inorder, List<HashTag> hashTags, List<Creator> creators, String lyrics, String describe, int hit, LocalDateTime createdAt) {
        this.title = title;
        this.writer = writer;
        this.contentType = contentType;
        this.inorder = inorder;
        this.hashTags = hashTags;
        this.creators = creators;
        this.lyrics = lyrics;
        this.describe = describe;
        this.hit = hit;
        this.createdAt = createdAt;

        if(this.creators !=null){
            for (Creator c: this.creators){
                c.setContent(this);
            }
        }
    }
}
