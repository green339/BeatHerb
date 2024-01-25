import axios from "axios";

// 구글 로그인
export const loginWithGoogle = () => {
  console.log("Google Login Button Click");
  // 구글 로그인
}

// 네이버 로그인
export const loginWithNaver = () => {
  console.log("Naver Login Button Click");
  // 네이버 로그인
}

// 카카오 로그인
export const loginWithKakao = () => {
  console.log("Kakao Login Button Click");
  const api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${api_key}&redirect_uri=${redirect_uri}&scope=openid`;
  window.location.href = kakaoURL;
}

// 이메일을 직접 입력해서 로그인
export const loginWithEmail = (email) => {
  console.log("Email Login Button Click", email);
  // 이메일을 직접 입력해서 로그인
}