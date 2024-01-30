// 제목이 곁들어진 아이템 컨테이너

import { Link } from "react-router-dom";

export default function ItemContainerWithTitle({ children, title, link, scrolled = false }) {
  // 스크롤 활성화 시 추가할 tailwindcss 클래스
  const scrollClass = " scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-base-200 hover:scrollbar-thumb-primary overflow-x-scroll pb-2";

  return (
    <div className="w-full p-8">
      <div className="flex text-base-content gap-16 mb-4">
        <h1>{title}</h1>
        <Link to={link} className="text-base-content hover:text-base-content flex items-center">바로가기</Link>
      </div>
      <div className="w-full">
        <div className={"flex gap-8" + (scrolled ? scrollClass : "")}>
          { children }
        </div>
      </div>
    </div>
  );
}