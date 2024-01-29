// 게시판 페이지

import NavBar from "../components/NavBar";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ContentsBoard from "./ContentsBoard";

export default function Board() {
  const { category } = useParams();
  let children = <></>; // 하위 항목

  switch (category) {
    case "all":
      children = <></>;
      break;
    case "favorite":
      children = <></>;
      break;
    case "contents":
      children = <ContentsBoard />;
      break;
    case "shorts":
      children = <></>;
      break;
    case "live":
      children = <></>;
      break;
    default:
      //메인 페이지로 리다이렉트
      break;
  }

  return (
    <>
      <NavBar />
      <div className="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          { children }
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>
              <Link to="/board/all" className="text-3xl p-4 text-base-content hover:text-base-content">전체</Link>
            </li>
            <li>
              <Link to="/board/favorite" className="text-3xl p-4 text-base-content hover:text-base-content">인기</Link>
            </li>
            <li>
              <Link to="/board/contents" className="text-3xl p-4 text-base-content hover:text-base-content">컨텐츠</Link>
            </li>
            <li>
              <Link to="/board/shorts" className="text-3xl p-4 text-base-content hover:text-base-content">Shorts</Link>
            </li>
            <li>
              <Link to="/board/live" className="text-3xl p-4 text-base-content hover:text-base-content">라이브</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}