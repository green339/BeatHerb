package store.beatherb.restapi.content.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import store.beatherb.restapi.content.domain.HashTag;
import store.beatherb.restapi.content.domain.HashTagRepository;
import store.beatherb.restapi.content.dto.request.DeleteHashTagRequest;
import store.beatherb.restapi.content.dto.request.HashTagSearchNameRequest;
import store.beatherb.restapi.content.dto.request.RegistHashTagRequest;
import store.beatherb.restapi.content.dto.request.UpdateHashTagRequest;
import store.beatherb.restapi.content.dto.respone.HashTagListResponse;
import store.beatherb.restapi.content.dto.respone.RegistHashTagResponse;
import store.beatherb.restapi.content.dto.respone.UpdateHashTagResponse;
import store.beatherb.restapi.content.exception.HashTagErrorCode;
import store.beatherb.restapi.content.exception.HashTagException;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class HashTagService {
    private final HashTagRepository hashTagRepository;

    public RegistHashTagResponse registHashTag(RegistHashTagRequest registHashTagRequest){
        HashTag hashTag = HashTag.builder()
                .name(registHashTagRequest.getName())
                .build();

        hashTagRepository.save(hashTag);

        return RegistHashTagResponse.toDto(hashTag);
    }

    public UpdateHashTagResponse updateHashTag(UpdateHashTagRequest updateHashTagRequest){
        HashTag hashTag = hashTagRepository.findById(updateHashTagRequest.getId())
                .orElseThrow(() -> new HashTagException(HashTagErrorCode.HASHTAG_IS_NOT_EXIST));

        hashTag.changeName(updateHashTagRequest.getName());

        hashTagRepository.save(hashTag);
        return UpdateHashTagResponse.toDto(hashTag);
    }

    public void deleteHashTag(DeleteHashTagRequest deleteHashTagRequest){
        hashTagRepository.delete(
                hashTagRepository.findById(deleteHashTagRequest.getId())
                        .orElseThrow(() -> new HashTagException(HashTagErrorCode.HASHTAG_IS_NOT_EXIST)));
    }

    public List<HashTagListResponse> findAllHashTag(){

        List<HashTag> list = hashTagRepository.findAll();
        List<HashTagListResponse> result = new ArrayList<>();
        for(HashTag t: list){
            result.add(HashTagListResponse.toDto(t));
        }
        return result;
    }

    public List<HashTagListResponse> findAllORfindByNameStartsWith(HashTagSearchNameRequest hashTagSearchNameRequest) {
        List<HashTag> list;
        if(hashTagSearchNameRequest.getName() == null){
            list = hashTagRepository.findAll();
        }
        else{
            list =  hashTagRepository.findByNameStartsWith(hashTagSearchNameRequest.getName());
        }
        List<HashTagListResponse> result = new ArrayList<>();
        for(HashTag t: list){
            result.add(HashTagListResponse.toDto(t));
        }
        return result;
    }
}
