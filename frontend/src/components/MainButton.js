// 메인페이지에서 사용할 버튼

export default function MainButton({ imgSrc, text }) {
  return (
    <div className="flex flex-col justify-center items-center w-[200px] h-[200px] bg-primary rounded-lg">
      <img className="w-3/4 h-3/4" src={imgSrc} alt="image"/>
      <p className="text-2xl">{text}</p>
    </div>
  );
}