package store.beatherb.restapi.global.auth.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository extends JpaRepository<Auth, String> {
    Auth findByUuid(String uuid);
}
