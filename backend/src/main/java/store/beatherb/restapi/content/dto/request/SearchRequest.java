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
        if(!genre.isEmpty()){
            this.genre = genre.split(" ");
        }
        if(!bpm.isEmpty()){
            this.bpm = bpm.split(" ");
        }
        if(!keyNote.isEmpty()){
            this.keyNote = keyNote.split(" ");
        }
        if(!instrument.isEmpty()){
            this.instrument = instrument.split(" ");
        }
        this.keyword = keyword;
    }
}
