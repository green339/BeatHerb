// 컨텐츠 게시판 페이지 항목

import { useState } from "react"
import ContentsItem from "../components/ContentsItem";
import { useLocation } from "react-router-dom";

// 탭 리스트
const tabs = [
  { value: "melody", title: "멜로디" },
  { value: "vocal", title: "보컬" },
  { value: "music", title: "음원" },
]

export default function ContentsBoard() {
  const location = useLocation();

  const [category, setCategory] = useState(location.state?.category || "melody");
  const [sortOption, setSortOption] = useState(location.state?.sortOption || "recent");

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  }

  const contentsNum = (sortOption === "recent" ? 100 : 5);

  return (
    <div className="w-full h-full">
      <div role="tablist" className="tabs tabs-bordered my-8 tabs-lg">
        {
          tabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              className={"tab w-1/2 translate-x-1/2" + (category === tab.value ? " tab-active" : "")}
              onClick={() => setCategory(tab.value)}
            >
              {tab.title}
            </button>
          ))
        }
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
              <div key={value} className="flex justify-center">
                <ContentsItem contentsId={value} size={150} title={category}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}