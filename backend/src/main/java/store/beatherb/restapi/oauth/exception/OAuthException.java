package store.beatherb.restapi.oauth.exception;

import store.beatherb.restapi.global.exception.BeatHerbException;
import store.beatherb.restapi.global.exception.ErrorCode;

public class OAuthException extends BeatHerbException {
    public OAuthException(ErrorCode errorCode){
        super(errorCode);
    }
}
