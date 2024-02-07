// 컨텐츠 게시판 페이지 항목

import { useState, useEffect } from "react"
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
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    // axios({
    //   method: "",
    //   url: ""
    // })
    // .then((response) => {
    //   setContentList(response.data);
    // })
    // .catch((error) => {
    //   alert("데이터를 받는 도중 문제가 발생했습니다.")
    // })

    // 임시
    //백엔드랑 연결 후 삭제 예정
    const contentsNum = (sortOption === "recent" ? 100 : 5);
    const newContentList = Array(contentsNum).fill().map((v,i)=>i+1)
    setContentList(newContentList);

    return () => setContentList([]);
  }, [category, sortOption])

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  }

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

      <div className="grid grid-cols-4 gap-4 items-center">
        {
          contentList.map((value, index) => {
            const demoContent = {
              albumArt: "https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04",
              title: category,
              artist: "Artist"
            }
            return (
              <div key={value} className="flex justify-center">
                <ContentsItem contentsId={value} size={150} albumArt={demoContent.albumArt} title={demoContent.title} artist={demoContent.artist}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}