import axios from "axios";

// 구글 로그인
export const loginWithGoogle = () => {
  console.log("Google Login Button Click");
  const apiKey = process.env.REACT_APP_GOOGLE_REST_API_KEY;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI_GOOGLE;
  const googleUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${apiKey}&redirect_uri=${redirectUri}&response_type=code&scope=openid email profile`
  window.location.href = googleUrl
  // 구글 로그인
}

// 네이버 로그인
export const loginWithNaver = () => {
  console.log("Naver Login Button Click");
  const apiKey = process.env.REACT_APP_NAVER_REST_API_KEY;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI_NAVER;
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${apiKey}&redirect_uri=${redirectUri}&state=1234`
  window.location.href = naverUrl;
}

// 카카오 로그인
export const loginWithKakao = () => {
  console.log("Kakao Login Button Click");
  const apiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI_KAKAO;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${apiKey}&redirect_uri=${redirectUri}&scope=openid`;
  window.location.href = kakaoUrl;
}

// 이메일을 직접 입력해서 로그인
export const loginWithEmail = (email) => {
  console.log("Email Login Button Click", email);
  // 이메일을 직접 입력해서 로그인
}