// 라이브 게시판 페이지 항목
import LiveItem from "../components/LiveItem";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LiveBoard() {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("recent");
  const [liveList, setLiveList] = useState([]);
  const [liveTitle, setLiveTitle] = useState("");
  const [liveDescription, setLiveDescription] = useState("");
  const liveCreateRef = useRef();

  const serverURL = process.env.REACT_APP_TEST_SERVER_BASE_URL;

  useEffect(() => {
    // axios({
    //   method: "",
    //   url: ""
    // })
    // .then((response) => {
    //   setShortsList(response.data);
    // })
    // .catch((error) => {
    //   alert("데이터를 받는 도중 문제가 발생했습니다.")
    // })

    // 임시
    //백엔드랑 연결 후 삭제 예정
    const liveNum = (sortOption === "recent" ? 100 : 5);
    const newLiveList = Array(liveNum).fill().map((v,i)=>i+1)
    setLiveList(newLiveList);

    return () => setLiveList([]);
  }, [sortOption])

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  }

  const handleLiveCreateClick = () => {
    axios({
      method: "post",
      url: `${serverURL}/live`,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.miJGqRO1oHnRY5NQq_Oo3uTU9mzZ9-aedSstOQkMF1U'
      },
      data: {
        "title" : "엄",
        "describe" : "준식"
      }
    })
    .then((response) => {
      console.log(response);
      const id = response.data.id;
      const token = response.data.data.token;
      const role = response.data.data.role;

      console.log()
      navigate(`/live/1`, {state: {token, role}});
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
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
          <button className="btn btn-ghost btn-sm text-base-content" onClick={openLiveCreateModal}>+ 라이브 생성</button>
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
            liveList.map((value, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <LiveItem title={sortOption}/>
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