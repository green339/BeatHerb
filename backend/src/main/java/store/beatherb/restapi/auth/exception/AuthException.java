package store.beatherb.restapi.auth.exception;

import store.beatherb.restapi.global.exception.BeatHerbException;
import store.beatherb.restapi.global.exception.ErrorCode;

public class AuthException extends BeatHerbException {
    public AuthException(ErrorCode code) {
        super(code);
    }
}
