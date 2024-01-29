package store.beatherb.restapi.content.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Table(name="inorder")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Inorder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private long id;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @Builder
    public Inorder(Content content) {
        this.content = content;
    }
}
