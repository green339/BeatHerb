// 인가코드를 받으면 여기로 리다이렉트 됨
// 현재는 인가코드를 받아서 보내는 부분만 구현됨, 향후 소켓도 보낼 수 있도록 작성하기

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

export default function AuthRedirection() {
  const navigate = useNavigate();
  const { provider } = useParams();
  const serverURL = process.env.REACT_APP_SERVER_URL;
  // 비동기 작업을 동기로 바꿔주기 위해, async await 적용 생각해 볼 수 있음
  useEffect(() => {
    // 인가 코드
    const code = new URL(window.location.href).searchParams.get("code");
    if (provider === "kakao") {
      
      // 서버로 요청을 보냄
      axios({
        method: 'post',
        url: `${serverURL}`,
        data: {
          code : code
        }
      })
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((error) => {
        console.log(error.data);
      })
      .finally(() => {
        navigate("/");
      })

    } else if (provider === "naver") {
      
      // 네이버 로그인은 state 추가로 필요
      const state = new URL(window.location.href).searchParams.get("state");

      // 서버로 요청을 보냄
      axios({
        method: 'post',
        
        url: `${serverURL}`,
        data: {
          code : code,
          state : state
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      })
      .finally(() => {
        navigate("/");
      })

    } else if (provider === "google") {

      // 서버로 요청을 보냄
      axios({
        method: 'post',
        
        url: `${serverURL}`,
        data: {
          code : code
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      })
      .finally(() => {
        navigate("/");
      })

    } else if (provider === "email") {
      const encoded_email = new URL(window.location.href).searchParams.get("encoded");
      const email = atob(encoded_email);
      // 서버로 요청을 보냄
      axios({
        method: 'post',
        url: `${serverURL}`,
        data: {
          email : email
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
      })
      .finally(() => {
        navigate("/");
      })
    } else {
      alert("유효하지 않은 접근입니다.");
    }

    
  }, []);

  return (
    <div className="absolute w-full right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2">
      <span className="loading loading-ring w-32 h-32 text-primary" />
    </div>
  );
}