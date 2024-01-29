package store.beatherb.restapi.directmessage.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DirectMessageRepository extends JpaRepository<DirectMessage,Long> {
}
