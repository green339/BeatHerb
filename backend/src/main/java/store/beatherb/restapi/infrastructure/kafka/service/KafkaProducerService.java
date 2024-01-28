package store.beatherb.restapi.infrastructure.kafka.service;


import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.infrastructure.kafka.KafkaTopic;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {




    private final KafkaTemplate<String, String> kafkaTemplate;


    public void sendMessage(final KafkaTopic topic, String message){
        kafkaTemplate.send(topic.getTopic(),message);
    }

    public void sendChat(String message){
        /*
        TODO : MESSAGE 포매터 적용 후 전송
        TODO : Sender, Receiver Message 레벨에서 추가
         */
        this.sendMessage(KafkaTopic.DIRECT_MESSAGE,message);
    }


}
