package store.beatherb.restapi.content.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.content.domain.ContentRepository;
import store.beatherb.restapi.content.exception.ContentErrorCode;
import store.beatherb.restapi.content.exception.ContentException;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;

    public List<Content> getContentsOrderByHit(){
        Optional<List<Content>> contentListOptional = contentRepository.findAllByOrderByHitDesc();
        List<Content> contentList = contentListOptional.orElseThrow(() -> new ContentException(ContentErrorCode.LIST_HAS_NOT_CONTENT));


        return contentList;
    }
}
