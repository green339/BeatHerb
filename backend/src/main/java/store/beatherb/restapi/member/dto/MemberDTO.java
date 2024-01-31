package store.beatherb.restapi.member.dto;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import store.beatherb.restapi.member.domain.Member;

import java.util.Date;

@Data
@AllArgsConstructor
@Builder
public class MemberDTO {

    private Long id;
    private String email;
    private String name;
    private String nickname;
    private Boolean advertise;
    private String picture;
    private Boolean dmAgree;
    private String naver;
    private String kakao;
    private String google;


    public static MemberDTO toDTO(Member entity) {
        return MemberDTO.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .nickname(entity.getNickname())
                .advertise(entity.getAdvertise())
                .picture(entity.getPicture())
                .dmAgree(entity.isDmAgree())
                .naver(entity.getNaver())
                .kakao(entity.getKakao())
                .google(entity.getGoogle())
                .build();
    }

}
