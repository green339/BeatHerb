package store.beatherb.restapi.content.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import store.beatherb.restapi.content.dto.FavoriteDTO;
import store.beatherb.restapi.content.service.FavoriteService;

@Slf4j
@RequestMapping("/api/favorite")
@RequiredArgsConstructor
@RestController
public class FavoriteController {
    private final FavoriteService favoriteService;

    @PostMapping("/add")
    public void favoriteContent(FavoriteDTO favoriteDTO) {
        favoriteService.favoriteContentService(favoriteDTO);
    }

    @DeleteMapping("/remove")
    public void removeFavoriteContent(FavoriteDTO favoriteDTO) {
        favoriteService.removeFavoriteContentService(favoriteDTO);
    }
}
