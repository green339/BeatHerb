package store.beatherb.restapi.live.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface LiveRepository extends JpaRepository<Live, Long> {
}
