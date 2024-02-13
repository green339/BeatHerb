package store.beatherb.restapi.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.domain.Content;
import store.beatherb.restapi.content.exception.ContentErrorCode;
import store.beatherb.restapi.content.exception.ContentException;
import store.beatherb.restapi.follow.domain.FollowRepository;
import store.beatherb.restapi.global.auth.exception.AuthErrorCode;
import store.beatherb.restapi.global.auth.exception.AuthException;
import store.beatherb.restapi.member.domain.Verify;
import store.beatherb.restapi.member.domain.VerifyRepository;
import store.beatherb.restapi.global.auth.dto.response.VerifyTokenResponse;
import store.beatherb.restapi.global.auth.service.AuthService;
import store.beatherb.restapi.global.mail.service.MailService;
import store.beatherb.restapi.global.mail.vo.MailVo;
import store.beatherb.restapi.global.validate.Email;
import store.beatherb.restapi.member.domain.Member;
import store.beatherb.restapi.member.domain.MemberRepository;

import store.beatherb.restapi.member.dto.MemberDTO;
import store.beatherb.restapi.member.dto.request.SignInRequest;
import store.beatherb.restapi.member.dto.request.SignUpRequest;
import store.beatherb.restapi.member.dto.response.MemberDetailResponse;
import store.beatherb.restapi.member.dto.response.MemberSearchResponse;
import store.beatherb.restapi.member.exception.MemberErrorCode;
import store.beatherb.restapi.member.exception.MemberException;
import store.beatherb.restapi.oauth.dto.Provider;
import store.beatherb.restapi.oauth.dto.request.OAuthRequest;
import store.beatherb.restapi.oauth.service.OAuthService;

import java.io.File;
import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final OAuthService oauthService;
    private final MailService mailService;
    private final AuthService authService;
    private final VerifyRepository verifyRepository;

    private final String IMAGE_DIRECTORY;

    private final FollowRepository followRepository;

    public MemberService(MemberRepository memberRepository,
                         OAuthService oauthService,
                         MailService mailService,
                         AuthService authService,
                         VerifyRepository verifyRepository,
                         @Value("${resource.directory.profile.image}") String IMAGE_DIRECTORY,
                         FollowRepository followRepository) {
        this.memberRepository = memberRepository;
        this.oauthService = oauthService;
        this.mailService = mailService;
        this.authService = authService;
        this.verifyRepository = verifyRepository;
        this.IMAGE_DIRECTORY = IMAGE_DIRECTORY;
        this.followRepository = followRepository;
    }

    @Transactional
    public void signUp(SignUpRequest signUpRequest) {
        Email.validate(signUpRequest.getEmail());

        //1. 이메일 valid 검사


        memberRepository.findByEmail(signUpRequest.getEmail())
                .ifPresent(member -> {
                    throw new MemberException(MemberErrorCode.EMAIL_EXIST);
                });

        Member member = Member.builder()
                .email(signUpRequest.getEmail())
                .build();
        memberRepository.save(
                member
        );

        Verify verify = Verify.builder()
                .member(member)
                .build();
        verifyRepository.save(verify);
        //이메일 인증 보내기
        MailVo mailVo = MailVo.builder()
                .address(signUpRequest.getEmail())
                .uuid(verify.getUuid())
                .build();

        mailService.authMailSend(mailVo);
        log.info("메일인증 발송!");
    }

    public void signIn(SignInRequest signInRequest) {
        Member member = memberRepository.findByEmail(signInRequest.getEmail())
                .orElseThrow(
                        () -> {
                            return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                        }
                );
        Verify verify = member.getVerify().orElseGet( //token 이 없다면 생성 후 반환
                () -> {
                    Verify a = Verify.builder().member(member).build();
                    verifyRepository.save(a);
                    return a;
                }

        );

        log.info("token = [{}] ", verify.getUuid());
        //이메일 인증 보내기
        MailVo mailVo = MailVo.builder()
                .address(member.getEmail())
                .uuid(verify.getUuid())
                .build();
        mailService.authMailSend(mailVo);
    }

    public VerifyTokenResponse socialSignIn(OAuthRequest oauthRequest, Provider provider) {
        String sub = oauthService.sub(oauthRequest, provider);
        Member member = null;
        switch (provider) {
            case KAKAO ->
                    member = memberRepository.findByKakao(sub).orElseThrow(() -> new MemberException(MemberErrorCode.SOCIAL_IS_NOT_EXIST));
            case NAVER ->
                    member = memberRepository.findByNaver(sub).orElseThrow(() -> new MemberException(MemberErrorCode.SOCIAL_IS_NOT_EXIST));
            case GOOGLE ->
                    member = memberRepository.findByGoogle(sub).orElseThrow(() -> new MemberException(MemberErrorCode.SOCIAL_IS_NOT_EXIST));
        }

        //토큰 생성 결과값 보내기
        assert member != null;
        return authService.generateVerifyTokenResponse(member.getId());
    }


    @Transactional
    public VerifyTokenResponse verify(String token) {
        // uuid 정보가 table에 존재하는지 확인
        Verify verify = verifyRepository.findByUuid(token).orElseThrow(
                () -> {
                    return new AuthException(AuthErrorCode.INVALID_TOKEN);
                }
        );

        Member member = verify.getMember().orElseThrow(
                () -> {
                    return new MemberException(MemberErrorCode.TOKEN_IS_NOT_VALID);
                }
        );
        verifyRepository.delete(verify);

        return authService.generateVerifyTokenResponse(member.getId());
    }

    public Resource getImage(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(
                () -> {
                    return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                }
        );
        String fileName = member.getImage();
        if (fileName == null) {
            fileName = "noimage.jpeg";
        }
        String filePath = IMAGE_DIRECTORY + "/" + fileName;
        log.info("FILE NAME = [{}]", filePath);

        File file = new File(filePath);
        if (!file.exists()) {
            file = new File(IMAGE_DIRECTORY + "/noimage.jpeg");
        }

        try {
            Resource resource = new FileSystemResource(file);
            return resource;
        } catch (Exception e) {
            throw new MemberException(MemberErrorCode.IMAGE_PROCESSING_ERROR);
        }
    }

    @Transactional
    public MemberDetailResponse detailMemberById(MemberDTO memberDTO,Long id) {
        log.info("Member DTO = [{}] ", memberDTO);
        Member member = memberRepository.findById(id).orElseThrow(
                () -> {
                    return new MemberException(MemberErrorCode.MEMBER_FIND_ERROR);
                }
        );

        boolean follow = false;
        if(memberDTO == null){
            follow = followRepository.findByMemberIdAndFollowMemberId(member.getId(),id).isPresent();
        }
        return MemberDetailResponse.toDto(member,follow);

    }

    public List<MemberSearchResponse> findByNickName(String nickname) {
        List<Member> memberList = memberRepository.findByNicknameContains(nickname);

        List<MemberSearchResponse> memberSearchResponseList = new ArrayList<>();
        for(Member member:memberList){
            memberSearchResponseList.add(MemberSearchResponse.toDto(member));
        }
        return memberSearchResponseList;
    }
}
