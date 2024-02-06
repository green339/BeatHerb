package store.beatherb.restapi.interest.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import store.beatherb.restapi.global.auth.domain.LoginUser;
import store.beatherb.restapi.interest.domain.Interest;
import store.beatherb.restapi.interest.dto.request.DeleteInterestRequest;
import store.beatherb.restapi.interest.dto.request.RegistInterestRequest;
import store.beatherb.restapi.interest.service.InterestService;
import store.beatherb.restapi.member.dto.MemberDTO;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/interest")
public class InterestController {
    private final InterestService interestService;

    @PostMapping
    public ResponseEntity<Interest> registInterest(@LoginUser MemberDTO memberDto, @RequestBody RegistInterestRequest registInterestRequest){
        return ResponseEntity.ok(interestService.registInterest(memberDto, registInterestRequest));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteInterest(@RequestBody DeleteInterestRequest deleteInterestRequest){
        interestService.deleteInterest(deleteInterestRequest);
        return ResponseEntity.ok("delete ok");
    }
}
