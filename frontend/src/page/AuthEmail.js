// 메일 인증 페이지

export default function AuthEmail() {
  // 메일 인증
  const handleOnClick = () => {
    console.log("click email verify button!!!");
    // 메일 인증 과정
  }

  return (
    <div className="absolute w-full right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 space-y-32">
      <h1 className="text-primary text-6xl">메일인증 안내입니다.</h1>
      <p className="text-base-content text-xl">아래의 '메일 인증' 버튼을 클릭하여 메일 인증을 완료해주세요.</p>
      <button className="btn btn-primary w-1/6" onClick={handleOnClick}>메일 인증</button>
    </div>
  );
}