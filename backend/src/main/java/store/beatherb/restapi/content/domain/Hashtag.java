package store.beatherb.restapi.content.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Table(name="hashtag")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Hashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private long id;

    @Column(name="name")
    private String hashtagName;
}
