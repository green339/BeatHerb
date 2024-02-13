package store.beatherb.restapi.content.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.domain.FavoriteRepository;
import store.beatherb.restapi.content.domain.Star;
import store.beatherb.restapi.content.dto.FavoriteDTO;
import store.beatherb.restapi.content.exception.FavoriteErrorCode;
import store.beatherb.restapi.content.exception.FavoriteException;

@Service
@Slf4j
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public void favoriteContentService(FavoriteDTO favoriteDTO) {
        if (favoriteRepository.findByContentIdAndMemberId(favoriteDTO.getContent().getId(), favoriteDTO.getMember().getId()).isEmpty()) {
            Star favorite = Star.builder()
                    .content(favoriteDTO.getContent())
                    .member(favoriteDTO.getMember())
                    .build();
            favoriteRepository.save(favorite);
        }
    }

    public void removeFavoriteContentService(FavoriteDTO favoriteDTO) {
        Star favorite = favoriteRepository.findByContentIdAndMemberId(favoriteDTO.getContent().getId(), favoriteDTO.getMember().getId()).orElseThrow(
                () -> {
                    return new FavoriteException(FavoriteErrorCode.FAVORITE_FIND_ERROR);
                });
        favoriteRepository.deleteById(favorite.getId());
    }
}
