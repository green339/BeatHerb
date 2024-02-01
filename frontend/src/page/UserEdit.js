import { useState, useRef } from "react";
import { Link } from "react-router-dom";

// 유저 정보 수정 로직
// 프로필 사진, 닉네임, DM 수신 여부
    // 각 버튼을 눌렀을 때 정보를 State에 담아줌
// 수정하기, 취소 버튼을 누르면 메인 페이지로 redirect
// 이미지 업로드 기능도 구현

export default function MyPage() {

    const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    // 파일 업로드 기능은 추후 구현
    const [file, setFile] = useState(null);
    const fileInput = useRef(null);

    const onChange = (e) => {
        if(e.target.files[0]){
                setFile(e.target.files[0])
        }else{ //업로드 취소할 시
            setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
            return
        }
        //화면에 프로필 사진 표시
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (   
        <div className="absolute w-full right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2">
            <div className="flex flex-col w-full items-center justify-center">
                <div className="text-base-content pt-5 pb-50">
                    <div className="text-4xl pb-10">회원 정보 수정</div>
                    <div className="flex justify-center pb-5" width="200" height="200">    
                        
                        <img 
                            src={image} 
                            alt="Profile Image" 
                            style={{ margin: '20px', width: '200px', height: '200px', borderRadius: '50%' }} 
                            onClick={() => { fileInput.current.click() }}
                            class="cursor-pointer" 
                        />
                        
                        <input 
                            type='file' 
                            style={{display:'none'}}
                            accept='image/jpg,impge/png,image/jpeg' 
                            name='profile_img'
                            onChange={onChange}
                            ref={fileInput}
                        />
                            
                    </div>
                    <div className="flex items-center justify-center pb-10">
                        <div className="text-left whitespace-nowrap pr-7 ml-6">닉네임</div>
                        <input type="text" placeholder="닉네임을 입력해주세요." className="input input-ghost w-full max-w-xs px-3" />
                    </div>
                    <div className="flex pb-20">
                        {/* 향후 관심사 기능 추가 필요 */}
                        <div className="text-left whitespace-nowrap pr-10 ml-6">관심사</div>
                        <div className="btn btn-primary btn-xs">+ 추가하기</div>
                    </div>
                    
                    <div className="flex justify-center">
                        <div className="self-auto text-xl flex">
                            {/* 파일 업로드 로직 구현 필요 */}
                            <Link to="/"><div className="px-8">수정하기</div></Link>
                            <Link to="/"><div className="px-8">취소하기</div></Link>
                        </div>
                    </div>
                </div>     
            </div>
        </div>   
    );
}