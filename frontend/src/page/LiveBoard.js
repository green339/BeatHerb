// 라이브 게시판 페이지 항목
import LiveItem from "../components/LiveItem";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/AuthStore";

export default function LiveBoard() {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("recent");
  const [liveList, setLiveList] = useState([]);
  const [liveTitle, setLiveTitle] = useState("");
  const [liveDescription, setLiveDescription] = useState("");
  const liveCreateRef = useRef();
  const { accessToken } = useAuthStore();

  const serverUrl = process.env.REACT_APP_TEST_SERVER_BASE_URL;

  useEffect(() => {
    axios({
      method: "get",
      url: `${serverUrl}/live`
    })
    .then((response) => {
      console.log(response.data.data);
      setLiveList(response.data.data);
    })
    .catch((error) => {
      alert("데이터를 받는 도중 문제가 발생했습니다.")
    })

    return () => setLiveList([]);
  }, [sortOption])

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  }

  const handleLiveCreateClick = () => {
    axios({
      method: "post",
      url: `${serverUrl}/live`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        "title" : liveTitle,
        "describe" : liveDescription
      }
    })
    .then((response) => {
      console.log(response);
      const id = response.data.id || 1;
      const token = response.data.data.token;
      const role = response.data.data.role;
      const title = response.data.data.title;
      const describe = response.data.data.describe;

      navigate(`/live/${id}`, {state: {token, role, title, describe}});
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data.message[0]);
    })
  }

  const joinLive = (liveId) => {
    axios({
      method: "get",
      url: `${serverUrl}/live/join/${liveId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      const id = response.data.id || 1;
      const token = response.data.data.token;
      const role = response.data.data.role;
      const title = response.data.data.title;
      const describe = response.data.data.describe;

      navigate(`/live/${id}`, {state: {token, role, title, describe}});
    })

  }

  const openLiveCreateModal = () => {
    liveCreateRef.current?.showModal();
  }
  
  const closeLiveCreateModal = (e) => {
    setLiveTitle("");
    setLiveDescription("");
  }

  return (
    <>
      <div className="w-full h-full">
        <div className="w-full flex justify-start my-8 ps-12 gap-12">
          <h1 className="text-primary text-3xl font-semibold">라이브</h1>
          { accessToken && <button className="btn btn-ghost btn-sm text-base-content" onClick={openLiveCreateModal}>+ 라이브 생성</button> }
        </div>

        <div className="w-full flex justify-end mb-8 pr-8">
          <select 
            value={sortOption} 
            className="select select-ghost w-full max-w-xs text-base-content justify-self-end"
            onChange={handleSortOptionChange}
          >
            <option key="recent" value="recent">최신 순</option>
            <option key="popularity" value="popularity">인기 순</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          {
            liveList.map((live, index) => {
              return (
                <div key={"live" + live.id} className="flex justify-center cursor-pointer" onClick={() => joinLive(live.id)}>
                  <LiveItem title={live.title}/>
                </div>
              )
            })
          }
        </div>
      </div>
      
      <dialog className="modal" ref={liveCreateRef}>
        <div className="modal-box w-4/3 max-w-5xl bg-base-200 space-y-8">
          <p className="text text-primary text-3xl text-semibold">라이브 생성</p>
          <div className="w-full flex place-content-center">
            <div className="w-3/4 flex flex-col place-items-left gap-4">
              <input
                type="text"
                placeholder="제목"
                className="input input-bordered w-full max-w-xs"
                value={liveTitle}
                onChange={(e) => setLiveTitle(e.target.value)}
              />
              <textarea
                placeholder="설명"
                className="textarea textarea-bordered w-full h-40"
                value={liveDescription}
                onChange={(e) => setLiveDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
            <button 
              className="btn btn-outline btn-primary"
              onClick={handleLiveCreateClick}
            >
              라이브 생성
            </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onSubmit={closeLiveCreateModal}>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}