// 로그인 페이지

import imgGoogle from "../assets/google.png";
import imgNaver from "../assets/naver.png";
import imgKakao from "../assets/kakao.png";
import { useState } from "react";
import { loginWithGoogle, loginWithNaver, loginWithKakao, loginWithEmail } from "../api/auth";

export default function LogIn() {
  const [email, setEmail] = useState('');

  return (
    <div className="absolute w-full right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2">
      <div className="flex flex-col w-full items-center justify-center">
        <h1 className="text-primary text-5xl my-10">BeatHerb에 오신 것을 환영합니다.</h1>
        <div className="text-base-content text-3xl">소셜 로그인</div>
        <div className="flex flex-row my-16">
          <button onClick={loginWithGoogle}><img className="mx-1.5 w-40 h-40" src={imgGoogle} alt="google" /></button>
          <button onClick={loginWithNaver}><img className="mx-1.5 w-40 h-40" src={imgNaver} alt="naver" /></button>
          <button onClick={loginWithKakao}><img className="mx-1.5 w-40 h-40" src={imgKakao} alt="kakao" /></button>
        </div>
        <div className="flex items-center justify-center w-full text-base-content">
          <div className="divider divider-primary w-10/12 text-3xl my-10">또는 이메일로 로그인하기</div>
        </div>
        <input
          className="input input-bordered join-item w-4/12 text-base-content"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={() => loginWithEmail(email)} className="btn btn-primary w-4/12 items-center my-2">이메일로 로그인</button>
      </div>
    </div>
  );
}
