import { Link } from "react-router-dom";

export default function UserButton() {
  const isLogin = true;

  if(isLogin) {
    return (
      <div className="flex gap-1 items-center">
        <p className="text-base-content m-0">BeatHerb님 환영 안 합니다</p>
        <details className="dropdown dropdown-bottom dropdown-end">
          <summary className="btn btn-circle btn-ghost">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="" />
              </div>
            </div>
          </summary>
          
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52">
            <li><a className="text-base-content hover:text-base-content" href="/">메세지</a></li>
            <li><a className="text-base-content hover:text-base-content" href="/">마이페이지</a></li>
            <li><a className="text-base-content hover:text-base-content" href="/">로그아웃</a></li>
          </ul>
        </details>
      </div>
    );
  }

  return (
    <Link to="/login" className="text-primary-content hover:text-primary-content">
      <button className="btn btn-ghost text-base-content">로그인</button>
    </Link>
  );
}