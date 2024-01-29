// 상단 네비게이션 바

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
        <details className="dropdown dropdown-bottom dropdown-end">
          <summary className="m-1 btn btn-circle btn-ghost">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="" />
              </div>
            </div>
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52">
            <li><a className="text-base-content hover:text-base-content" href="{()=>false}">메세지</a></li>
            <li><a className="text-base-content hover:text-base-content" href="{()=>false}">마이페이지</a></li>
            <li><a className="text-base-content hover:text-base-content" href="{()=>false}">로그아웃</a></li>
          </ul>
        </details>
      </div>
    </div>
  );
}