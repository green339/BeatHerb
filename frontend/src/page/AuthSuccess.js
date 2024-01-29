// 인증 완료 페이지

export default function AuthSuccess() {
  // 정보 수정 페이지로 이동
  const handleOnClick = () => {
    console.log("click email verify button!!!");
    // 프로필 수정 페이지로 이동
  }

  return (
    <div className="absolute w-full right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 p">
      <h1 className="text-primary text-6xl">인증 되었습니다.</h1>
      <p className="text-base-content text-xl">프로필을 완성해주세요.</p>
      <button className="btn btn-primary w-1/6" onClick={handleOnClick}>정보 수정</button>
    </div>
  );
}