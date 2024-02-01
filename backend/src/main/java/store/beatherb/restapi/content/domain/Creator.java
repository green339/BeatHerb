package store.beatherb.restapi.content.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Table(name="creator")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Creator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private long id;

    @Column(name="creator_id")
    private long creatorId;

    @ManyToOne
    @JoinColumn(name="content_id")
    private Content content;

    @Column(name="agree")
    private Boolean agree;

    @Builder
    public Creator(long creatorId, Content content, boolean agree) {
        this.creatorId = creatorId;
        this.content = content;
        this.agree = agree;
    }
}
