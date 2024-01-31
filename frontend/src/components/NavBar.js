// 상단 네비게이션 바

import UserButton from "./UserButton";

// 게시판 탭 드롭다운에 들어갈 메뉴들
const boardMenus = [
  { key: "all", title: "전체", href: "/board/all"},
  { key: "popularity", title: "인기", href: "/board/popularity"},
  { key: "contents", title: "컨텐츠", href: "/board/contents"},
  { key: "shorts", title: "Shorts", href: "/board/shorts"},
  { key: "live", title: "라이브", href: "/board/live"},
]

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
                {
                  boardMenus.map((menu) => (
                    <li key={menu.title}>
                      <a className="text-base-content hover:text-base-content" href={menu.href}>{menu.title}</a>
                    </li>
                  ))
                }
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