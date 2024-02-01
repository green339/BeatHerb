// 로그인 페이지

import imgGoogle from "../assets/google.png";
import imgNaver from "../assets/naver.png";
import imgKakao from "../assets/kakao.png";
import { useState } from "react";
import { loginWithGoogle, loginWithNaver, loginWithKakao, loginWithEmail } from "../api/auth";

export default function LogIn() {
  const [email, setEmail] = useState('');

  // 이메일 정규표현식
  const emailExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const isValid = emailExp.test(email);

  return (
    <div className="absolute w-full right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2">
      <div className="flex flex-col w-full items-center justify-center">
        <h1 className="text-primary text-5xl my-10">BeatHerb에 오신 것을 환영합니다.</h1>
        <div className="text-base-content text-2xl">소셜 로그인</div>
        <div className="flex flex-row my-8">
          <button onClick={loginWithGoogle}><img className="mx-1.5 w-40 h-40" src={imgGoogle} alt="google" /></button>
          <button onClick={loginWithNaver}><img className="mx-1.5 w-40 h-40" src={imgNaver} alt="naver" /></button>
          <button onClick={loginWithKakao}><img className="mx-1.5 w-40 h-40" src={imgKakao} alt="kakao" /></button>
        </div>
        <div className="flex items-center justify-center w-full text-base-content">
          <div className="divider divider-primary w-10/12 text-2xl my-10">또는 이메일로 로그인하기</div>
        </div>
        <input
          className={"input input-bordered w-1/3 join-item text-base-content"+(isValid || !email ? "" : " input-error")}
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className={"text-error mt-2 mb-1 text-sm" + (isValid || !email ? " invisible" : "")}>이메일 형식이 올바르지 않습니다.</p>
        <button disabled={!isValid} onClick={() => loginWithEmail(email)} className="btn btn-primary w-4/12 items-center my-2">이메일로 로그인</button>
      </div>
    </div>
  );
}
