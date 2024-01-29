import ShortsItem from "../components/ShortsItem";
import { useState } from "react";

export default function ShortsBoard() {
  const [sortOption, setSortOption] = useState("recent");

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  }

  const contentsNum = (sortOption === "recent" ? 100 : 5);

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-start my-8 ms-12">
        <h1 className="text-primary">Shorts</h1>
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
                <ShortsItem size={150} title={sortOption}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}