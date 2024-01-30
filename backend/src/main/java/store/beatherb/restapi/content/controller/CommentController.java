package store.beatherb.restapi.content.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import store.beatherb.restapi.content.domain.Comment;
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.content.dto.request.RegistCommentRequest;
import store.beatherb.restapi.content.service.CommentService;
import store.beatherb.restapi.global.auth.domain.LoginUser;
import store.beatherb.restapi.member.dto.MemberDTO;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;
    @PostMapping
    public ResponseEntity registComment(@LoginUser MemberDTO memberDto, @RequestBody RegistCommentRequest registCommentRequest){
        return ResponseEntity.ok(commentService.registerComment(memberDto, registCommentRequest));
    }

    @GetMapping("{contentId}")
    public ResponseEntity getCommentList(@PathVariable Long contentId){
        return ResponseEntity.ok(commentService.getComments(contentId));
    }
}
