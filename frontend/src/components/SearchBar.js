// 검색 바
// 상세 검색 구현 필요

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ initQuery = "" }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initQuery);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // 검색
  const handleSearchClick = () => {
    console.log('검색어는', query);
    navigate(`/board/all?query=${query}`);
  };

  return (
    <div className="rounded-lg bg-base-200">
      <div className="w-full p-8">
        <div className="join w-full justify-center">
          <div className="w-full">
            <input 
              className="input input-bordered join-item w-full text-base-content"
              placeholder="Search"
              value={query}
              onChange={handleSearchChange}
            />
          </div>
          <div className="">
            <button className="btn btn-primary disabled:btn-base-100 join-item" onClick={handleSearchClick}>
              <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
                <path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex gap-x-2 gap-y-2 flex-wrap">
            <div className="badge badge-lg badge-primary text-primary-content">primary</div>
            <div className="badge badge-lg badge-primary text-primary-content">primary</div>
            <div className="badge badge-lg badge-primary text-primary-content">primary</div>
            <div className="badge badge-lg badge-primary text-primary-content">primary</div>
          </div>
          <div className="text-base-content w-20 text-nowrap">
            상세 검색
          </div>
        </div>
      </div>
    </div>
  );
}