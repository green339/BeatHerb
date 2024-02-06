// 사용자가 메일에서 이메일 인증 버튼을 누르면 여기로 옴

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

export default function AuthRedirection() {
  const navigate = useNavigate();
  const serverURL = process.env.REACT_APP_SERVER_URL;
  // 비동기 작업을 동기로 바꿔주기 위해, async await 적용 생각해 볼 수 있음
  useEffect(() => {
    // 인가 코드
    const token = new URL(window.location.href).searchParams.get("token");

    // 서버로 요청을 보냄
    axios({
      method: 'post',
      url: `https://node5.wookoo.shop/api/api/verify?token=${token}`,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      alert("오류가 발생했습니다.");
      console.log(error);
      navigate("/");
    }) 
  }, []);

  return (
    <div className="absolute w-full right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2">
      <span className="loading loading-ring w-32 h-32 text-primary" />
    </div>
  );
}