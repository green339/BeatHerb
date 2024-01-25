import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthRedirection() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    // 백엔드에 인가코드 전달
    console.log(code);
    navigate("/");
  }, [])

  return <></>;
}