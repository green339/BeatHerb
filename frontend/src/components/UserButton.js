import { Link } from "react-router-dom";
import { useRef } from "react";
import Dm from "./Dm";

export default function UserButton() {
  const isLogin = true;
  const dmModalRef = useRef();

  if(isLogin) {
    return (
      <>
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
              <li><button className="text-base-content hover:text-base-content" onClick={() => dmModalRef.current?.showModal()}>메시지</button></li>
              <li><Link to="/mypage" className="text-base-content hover:text-base-content">마이페이지</Link></li>
              <li><a className="text-base-content hover:text-base-content" href="/">로그아웃</a></li>
            </ul>
          </details>
        </div>
        <dialog className="modal" ref={dmModalRef}>
          <div className="modal-box w-11/12 max-w-5xl bg-base-200">
            <Dm />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    );
  }

  return (
    <Link to="/login" className="text-base-content hover:text-base-content">
      <button className="btn btn-ghost text-base-content">로그인</button>
    </Link>
  );
}