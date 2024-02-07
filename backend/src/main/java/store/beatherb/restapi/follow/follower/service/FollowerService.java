package store.beatherb.restapi.follow.follower.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.follow.domain.Follow;
import store.beatherb.restapi.follow.domain.FollowRepository;
import store.beatherb.restapi.follow.follower.dto.request.DeleteFollowerRequest;
import store.beatherb.restapi.follow.follower.dto.request.RegistFollowerRequest;
import store.beatherb.restapi.follow.follower.dto.response.FollowersResponse;
import store.beatherb.restapi.follow.follower.dto.response.RegistFollowerResponse;
import store.beatherb.restapi.follow.follower.exception.FollowerErrorCode;
import store.beatherb.restapi.follow.follower.exception.FollowerException;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;
import store.beatherb.restapi.member.dto.MemberDTO;
import store.beatherb.restapi.member.exception.MemberErrorCode;
import store.beatherb.restapi.member.exception.MemberException;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FollowerService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    public RegistFollowerResponse registFollower(MemberDTO memberDTO, RegistFollowerRequest registFollowerRequest){
        Member member = memberRepository.findById(memberDTO.getId()).orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_FIND_ERROR));

        Member followMember = memberRepository.findById(registFollowerRequest.getId()).orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_FIND_ERROR));

        Follow follow = Follow.builder()
                .member(member)
                .followMember(followMember)
                .build();

        followRepository.save(follow);

        return RegistFollowerResponse.toDto(follow);
    }

    //나의 팔로워들을 리스트로 가져온다
    public List<FollowersResponse> getFollowerList(MemberDTO memberDTO){
        List<Follow> listFollow = followRepository.findByMemberId(memberDTO.getId()).orElseThrow(() -> new FollowerException(FollowerErrorCode.FOLLOWER_LIST_IS_NULL));

        List<FollowersResponse> listFollowers = new ArrayList<>();
        for(Follow follow : listFollow){
            Member member = memberRepository.findById(follow.getFollowMember().getId())
                    .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_FIND_ERROR));

            listFollowers.add(FollowersResponse.builder().member(member).build());
        }

        return listFollowers;
    }

    public void deleteFollower(DeleteFollowerRequest deleteFollowerRequest){
        followRepository.delete(
                followRepository.findById(deleteFollowerRequest.getId())
                        .orElseThrow(() -> new FollowerException(FollowerErrorCode.FOLLOWER_FIND_ERROR))
        );
    }
}
