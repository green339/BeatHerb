// 컨텐츠 게시판 페이지 항목

import { useState } from "react"
import ContentsItem from "../components/ContentsItem";

export default function ContentsBoard() {
  const [active, setActive] = useState("melody");
  const [sortOption, setSortOption] = useState("recent");

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  }

  const contentsNum = (sortOption === "recent" ? 100 : 5);

  return (
    <div className="w-full h-full">
      <div role="tablist" className="tabs tabs-bordered my-8 tabs-lg">
        <button
          role="tab"
          className={"tab w-1/2 translate-x-1/2" + (active === "melody" ? " tab-active" : "")}
          onClick={() => setActive("melody")}
        >
          멜로디
        </button>
        <button
          role="tab"
          className={"tab w-1/2 translate-x-1/2" + (active === "vocal" ? " tab-active" : "")}
          onClick={() => setActive("vocal")}
        >
          보컬
        </button>
        <button
          role="tab"
          className={"tab w-1/2 translate-x-1/2" + (active === "music" ? " tab-active" : "")}
          onClick={() => setActive("music")}
        >
          음원
        </button>
      </div>

      <div className="w-full flex justify-end mb-8">
        <select 
          value={sortOption} 
          className="select select-ghost w-full max-w-xs text-base-content justify-self-end"
          onChange={handleSortOptionChange}
        >
          <option key="recent" value="recent">최신 순</option>
          <option key="popularity" value="popularity">인기 순</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4 items-center">
        {
          Array(contentsNum).fill().map((v,i)=>i+1).map((value, index) => {
            return (
              <div key={index} className="flex justify-center">
                <ContentsItem size={150} title={active}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}