// 쇼츠 게시판 페이지 항목

import ShortsItem from "../components/ShortsItem";
import { useState, useEffect, useRef } from "react";
import ShortsModal from "../page/ShortsModal.js";
import ShortsPlay from "../page/ShortsPlay.js";

export default function ShortsBoard() {
  const [sortOption, setSortOption] = useState("recent");
  const [shortsList, setShortsList] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
  const shortsModalRef = useRef(null);
  const shortsPlayModalRef = useRef(null);
  const shortsPlayModalChildRef = useRef(null);
  const shortsPlayRef = useRef(null);
  const [selected, setSelected] = useState("");

  const openShortsPlayModal = () => {
    shortsPlayModalRef.current.showModal();
  };
  const closeShortsPlayModal = () => {
    shortsPlayModalChildRef.current.clear();
    shortsPlayModalRef.current.close();
  };
  useEffect(() => {
    const handleBackdropClick = (e) => {
      if (e.target === shortsPlayModalRef.current) {
        closeShortsPlayModal();
      }
    };
    window.addEventListener("click", handleBackdropClick);

    return () => {
      window.removeEventListener("click", handleBackdropClick);
    };
  }, []);
  const openShortsModal = () => {
    shortsModalRef.current.showModal();
  };
  const getModalCloseState = () => {
    //닫는다고 알려주는 그리고 여기서 닫아
    shortsModalRef.current.close();
  };
  // useEffect(() => {
  //   // axios({
  //   //   method: "",
  //   //   url: ""
  //   // })
  //   // .then((response) => {
  //   //   setShortsList(response.data);
  //   // })
  //   // .catch((error) => {
  //   //   alert("데이터를 받는 도중 문제가 발생했습니다.")
  //   // })

  //   // 임시
  //   // 백엔드랑 연결 후 삭제 예정
  //   const shortsNum = sortOption === "recent" ? 100 : 5;
  //   const newShortsList = Array(shortsNum)
  //     .fill()
  //     .map((v, i) => i + 1);
  //   setShortsList(newShortsList);

  //   return () => setShortsList([]);
  // }, [sortOption]);

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };
  const clickShortsBtn = (id) => {
    setSelected(id)
    openShortsPlayModal();
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-start my-8 ps-12 gap-12">
        <h1 className="text-primary text-3xl font-semibold">Shorts</h1>
        <button className="btn btn-ghost btn-sm text-base-content" onClick={openShortsModal}>
          + 쇼츠 생성
        </button>
        <dialog ref={shortsModalRef} className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <ShortsModal initState={true} getModalCloseState={getModalCloseState} />
          </div>
        </dialog>
        <dialog ref={shortsPlayModalRef} className="modal">
          <div className="modal-box w-7/12 max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <ShortsPlay ref={(el) => (shortsPlayModalChildRef.current = el)} selected={selected} />
          </div>
        </dialog>
      </div>

      <div className="w-full flex justify-end mb-8">
        <select
          value={sortOption}
          className="select select-ghost w-full max-w-xs text-base-content justify-self-end"
          onChange={handleSortOptionChange}>
          <option key="recent" value="recent">
            최신 순
          </option>
          <option key="popularity" value="popularity">
            인기 순
          </option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4 items-center">
        {shortsList.map((shorts, index) => {
          return (
            <div
              key={shorts.id}
              className="flex justify-center"
              onClick={() => clickShortsBtn(shorts.id)}>
              <ShortsItem title={sortOption} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
