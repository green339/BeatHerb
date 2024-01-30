// 컨텐츠 게시판 페이지 항목

import { useState } from "react"
import ContentsItem from "../components/ContentsItem";
import { useLocation } from "react-router-dom";

export default function ContentsBoard() {
  const location = useLocation();
  console.log(location);

  const [category, setCategory] = useState(location.state?.category || "melody");
  const [sortOption, setSortOption] = useState(location.state?.sortOption || "recent");

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  }

  const contentsNum = (sortOption === "recent" ? 100 : 5);

  return (
    <div className="w-full h-full">
      <div role="tablist" className="tabs tabs-bordered my-8 tabs-lg">
        <button
          role="tab"
          className={"tab w-1/2 translate-x-1/2" + (category === "melody" ? " tab-active" : "")}
          onClick={() => setCategory("melody")}
        >
          멜로디
        </button>
        <button
          role="tab"
          className={"tab w-1/2 translate-x-1/2" + (category === "vocal" ? " tab-active" : "")}
          onClick={() => setCategory("vocal")}
        >
          보컬
        </button>
        <button
          role="tab"
          className={"tab w-1/2 translate-x-1/2" + (category === "music" ? " tab-active" : "")}
          onClick={() => setCategory("music")}
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
                <ContentsItem size={150} title={category}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}