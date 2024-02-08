package store.beatherb.restapi.live.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import store.beatherb.restapi.content.domain.Content;

@Slf4j
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class LiveContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "live_id")
    private Live live;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @Builder
    public LiveContent(Live live, Content content){
        this.live = live;
        this.content = content;
    }
}
