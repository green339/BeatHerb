// 검색 바
// 상세 검색 구현 필요

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // 검색
  const handleSearchClick = () => {
    console.log('검색어는', query);
      //검색 로직 작성
  };

  return (
    <div className="join w-1/2 justify-center">
      <div className="w-full">
        <input 
          className="input input-bordered join-item w-full text-base-content"
          placeholder="Search"
          value={query}
          onChange={handleSearchChange}
        />
      </div>
      <div className="">
        <button className="btn btn-primary join-item" onClick={handleSearchClick}>Search</button>
      </div>
    </div>
  );
}