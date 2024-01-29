// 컨텐츠 게시판 페이지 항목

import { useState } from "react"
import ContentsItem from "../components/ContentsItem";

export default function ContentsBoard() {
  const [active, setActive] = useState("melody");

  return (
    <div className="w-full h-full">
      <div role="tablist" className="tabs tabs-bordered my-8">
        <button
          role="tab"
          className={"tab" + (active === "melody" ? " tab-active" : "")}
          onClick={() => setActive("melody")}
        >
          멜로디
        </button>
        <button
          role="tab"
          className={"tab" + (active === "vocal" ? " tab-active" : "")}
          onClick={() => setActive("vocal")}
        >
          보컬
        </button>
        <button
          role="tab"
          className={"tab" + (active === "music" ? " tab-active" : "")}
          onClick={() => setActive("music")}
        >
          음원
        </button>
      </div>

      <div className="w-full flex justify-end mb-8">
        <select className="select select-ghost w-full max-w-xs text-base-content justify-self-end">
          <option selected>최신 순</option>
          <option>인기 순</option>
        </select>
      </div>

      <div class="grid grid-cols-4 gap-4 items-center">
        {
          [...Array(100)].map((_,i) => {
            return (
              <div className="flex justify-center">
                <ContentsItem id={i} size={150} title={active}/>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}