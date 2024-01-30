package store.beatherb.restapi.content.dto.request;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class SearchRequest {
    String[] genre;
    String[] bpm;
    String[] keyNote;
    String[] instrument;
    String keyword;

    @Builder
    public SearchRequest(String genre, String bpm, String keyNote, String instrument, String keyword) {
        this.genre = genre.split(" ");
        this.bpm = bpm.split(" ");
        this.keyNote = keyNote.split(" ");
        this.instrument = instrument.split(" ");
        this.keyword = keyword;
    }
}
