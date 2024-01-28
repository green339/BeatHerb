package store.beatherb.socket.infrastructure.kafka.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import store.beatherb.socket.infrastructure.kafka.KafkaTopic;
import store.beatherb.socket.websocket.util.WebSocketHandler;

import java.io.IOException;


@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumerService {

    private final WebSocketHandler webSocketHandler;




    @KafkaListener(topics = "DM")
    public void consumeDM(String message) throws IOException{
        log.info("message : [{}]", message);

        //TODO : JSON 으로 컨버팅 후 receiver 보기
//        this.webSocketHandler.getSession("1").sendMessage(new TextMessage(message));


    }

}
