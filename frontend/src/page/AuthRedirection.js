// 인가코드를 받으면 여기로 리다이렉트 됨

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AuthRedirection() {
  const navigate = useNavigate();
  const { provider } = useParams();

  useEffect(() => {
    if (provider === "kakao") {
      //인가 코드
      const code = new URL(window.location.href).searchParams.get("code");

      axios({
        
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      })
      .finally(() => {

      })

      navigate("/");
    } else if (provider === "naver") {
      //인가 코드
      const code = new URL(window.location.href).searchParams.get("code");

      axios({

      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      })
      .finally(() => {

      })

      navigate("/");
    } else if (provider === "google") {
      //인가 코드
      const code = new URL(window.location.href).searchParams.get("code");

      axios({

      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      })
      .finally(() => {

      })

      navigate("/");
    } else if (provider === "email") {
      const encoded_email = new URL(window.location.href).searchParams.get("encoded");
      const email = atob(encoded_email);

      axios({
        
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      })
      .finally(() => {

      })
    } else {
      alert("유효하지 않은 접근입니다.");
      navigate("/");
    }
  }, []);

  return (
    <div className="absolute w-full right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2">
      <span className="loading loading-ring w-32 h-32 text-primary" />
    </div>
  );
}