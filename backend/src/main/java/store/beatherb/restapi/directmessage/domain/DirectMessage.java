package store.beatherb.restapi.directmessage.domain;


import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CreationTimestamp;
import store.beatherb.restapi.member.domain.Member;

import java.sql.Timestamp;
import java.util.Date;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "direct_message")
@Getter
public class DirectMessage {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="sender_id",nullable = false)
    private Member sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receivr_id",nullable = false)
    private Member receiver;

    @CreationTimestamp
    private Timestamp createdAt;
    @Column(nullable = false)
    private String message;

    @Builder
    public DirectMessage(Member sender, Member receiver, String message) {
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
    }

    @Override
    public String toString() {
        return "DirectMessage{" +
                "id=" + id +
                ", sender=" + sender.getId() +
                ", receiver=" + receiver.getId() +
                ", createdAt=" + createdAt +
                ", message='" + message + '\'' +
                '}';
    }
}
