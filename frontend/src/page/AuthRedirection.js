import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthRedirection() {
  const navigate = useNavigate();
  const { provider } = useParams();

  useEffect(() => {
    console.log(provider);
  
    if (provider === "kakao") {
      const code = new URL(window.location.href).searchParams.get("code");
      // 백엔드에 인가코드 전달
      console.log(code);
      navigate("/");
    } else if (provider === "naver") {
      const code = new URL(window.location.href).searchParams.get("code");
      // 백엔드에 인가코드 전달
      console.log(code);
      navigate("/");
    } else if (provider === "google") {
      const code = new URL(window.location.href).searchParams.get("code");
      // 백엔드에 인가코드 전달
      console.log(code);
      navigate("/");
    } else {
      alert("유효하지 않은 접근입니다.");
      navigate("/");
    }
  }, []);

  return <></>;
}