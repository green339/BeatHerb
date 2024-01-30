// 상단 네비게이션 바

import UserButton from "./UserButton";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 text-base-content">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl text-primary hover:text-primary" href="/">BeatHerb</a>
        <ul className="menu menu-horizontal px-1">
          <li><a className="text-base-content hover:text-base-content" href="/">Home</a></li>
          <li>
            <details>
              <summary>게시판</summary>
              <ul className="bg-base-200 w-32 p-2 z-10">
                <li><a className="text-base-content hover:text-base-content" href="/board/all">전체</a></li>
                <li><a className="text-base-content hover:text-base-content" href="/board/popularity">인기</a></li>
                <li><a className="text-base-content hover:text-base-content" href="/board/contents">컨텐츠</a></li>
                <li><a className="text-base-content hover:text-base-content" href="/board/live">Live</a></li>
                <li><a className="text-base-content hover:text-base-content" href="/board/shorts">Shorts</a></li>
              </ul>
            </details>
          </li>
          <li><a className="text-base-content hover:text-base-content" href="/workplace">작업실</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <UserButton />
      </div>
    </div>
  );
}