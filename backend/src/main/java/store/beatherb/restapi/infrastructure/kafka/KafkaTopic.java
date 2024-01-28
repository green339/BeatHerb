package store.beatherb.restapi.infrastructure.kafka;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum KafkaTopic {

    DIRECT_MESSAGE ("DM");
    private final String topic;

}
