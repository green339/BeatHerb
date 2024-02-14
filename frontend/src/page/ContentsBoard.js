// 컨텐츠 게시판 페이지 항목

import { useState, useEffect } from "react"
import ContentsItem from "../components/ContentsItem";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/AuthStore";
import { creatorListFormat } from "../common/creatorListFormat.js";

// 탭 리스트
const tabs = [
  { value: "melody", title: "멜로디" },
  { value: "vocal", title: "보컬" },
  { value: "music", title: "음원" },
]

export default function ContentsBoard() {
  const location = useLocation();
  const { accessToken } = useAuthStore();
  const [category, setCategory] = useState(location.state?.category || "melody");
  const [sortOption, setSortOption] = useState(location.state?.sortOption || "recent");
  const [contentList, setContentList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    const serverUrl = process.env.REACT_APP_TEST_SERVER_BASE_URL;
    const endPoint = (sortOption === "recent" ? "/content/search?title=" : "/content/popularity")

    axios({
      method: "get",
      url: `${serverUrl}${endPoint}`
    })
    .then((response) => {

      //새롭게 화면에 띄울 컨텐트 리스트
      let newContentList = []

      if (category === "melody") {
        newContentList = response.data.data.melodyList;
      } else if (category === "vocal") {
        newContentList = response.data.data.vocalList;
      } else {
        newContentList = response.data.data.soundTrackList;
      }

      // 새롭게 띄울 컨텐트들의 아이디만 모아놓은 리스트
      const contentIdList = newContentList.map((content, index) => content.id);

      axios({
        method: "get",
        url: `${serverUrl}/content/star?contentId=${contentIdList}`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setContentList(newContentList);
        setFavoriteList(contentIdList);
      })
      .catch((error) => {
        alert(error.response.data.message ? error.response.data.message : error.response.data.error)
      })
    })
    .catch((error) => {
      alert(error.response.data.message);
    })
  }, [accessToken, category, sortOption])

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
          contentList.map((content, index) => {
            const isFavorite = favoriteList.find((favorite) => favorite.id === content.id);
            return (
              <div key={"content" + content.id} className="flex justify-center">
                <ContentsItem 
                  contentsId={content.id} 
                  size={150} 
                  albumArt={content.image} 
                  title={content.title} 
                  artist={creatorListFormat(content.creatorList)}
                  isFavorite={isFavorite}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  );
}