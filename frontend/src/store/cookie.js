import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// Refresh Token 저장
// 현재 쿠키에 저장된 Refresh Token의 만료시간은 1시간으로 설정됨
export const setRefreshToken = (refreshToken) => {
  const moment = require('moment');
  const expiration = moment().add('1','h').toDate()
  return cookies.set(
    "refreshToken", 
    refreshToken,
    {
      path: "/",
      expires: expiration,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    }
  );
}

// 쿠키에 저장한 Refresh Token 받기
export const getRefreshToken = () => {
  return cookies.get("refreshToken");
}

// Refresh Token 제거
export const removeRefreshToken = () => {
  return cookies.remove("refreshToken");
}