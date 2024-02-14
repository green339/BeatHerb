// 전체 게시판 페이지 항목

import ItemContainerWithTitle from "../components/ItemContainerWithTitle";
import ShortsItem from "../components/ShortsItem";
import LiveItem from "../components/LiveItem";
import ContentsRanking from "../components/ContentsRanking";
import SearchBar from "../components/SearchBar";
import ContentsItem from "../components/ContentsItem";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { creatorListFormat } from "../common/creatorListFormat";

// 탭 리스트
const tabs = [
  { value: "melody", title: "멜로디" },
  { value: "vocal", title: "보컬" },
  { value: "music", title: "음원" },
]

export default function AllBoard() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('query'); 
  const hashtagListParam = searchParams.get('hashtagList');
  const query = queryParam ? queryParam : ""; 
  const hashtagListString = hashtagListParam ? hashtagListParam : "";
  const [contents, setContents] = useState({})
  const [category, setCategory] = useState("melody");

  useEffect(() => {
    const serverUrl = process.env.REACT_APP_TEST_SERVER_BASE_URL;

    axios({
      method: "get",
      url: `${serverUrl}/content/search?title=${query}`
    })
    .then((response) => {
      console.log(response.data);
      setContents(response.data.data);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    })
  }, [])

  let contentView;

  if(query || hashtagListString) {
    let searchList;
    
    if (category === "melody") {
      searchList = contents.melodyList ? contents.melodyList : [];
    } else if (category === "vocal") {
      searchList = contents.vocalList ? contents.vocalList : [];
    } else {
      searchList = contents.soundTrackList ? contents.soundTrackList : [];
    }

    contentView = (
      <div className="w-full h-full">
        <div className="flex flex-col gap-4">
          {query && <p className="text-primary text-2xl font-semibold">검색어 : {query}</p>}
          {hashtagListString && <p className="text-xl" >적용된 해시태그 : {hashtagListString}</p>}
        </div>
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

        <div className="grid grid-cols-4 gap-4 items-center">
          {
            searchList.map((content, index) => {
              return (
                <div key={"content" + content.id} className="flex justify-center">
                  <ContentsItem 
                    contentsId={content.id} 
                    size={150} 
                    albumArt={content.image} 
                    title={content.title} 
                    artist={creatorListFormat(content.creatorList)}
                   showFavorite={false}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  } else {
    contentView = (
      <>
        <ItemContainerWithTitle title="컨텐츠" link="/board/contents">
          <ContentsRanking title="신규 멜로디" link="/board/contents" data={{ category: "melody" }} />
          <ContentsRanking title="신규 보컬" link="/board/contents" data={{ category: "vocal" }} />
          <ContentsRanking title="신규 음원" link="/board/contents" data={{ category: "music" }} />
        </ItemContainerWithTitle>
        <ItemContainerWithTitle title="Shorts" link="/board/shorts" scrolled>
          {Array(10).fill().map((v,i)=>i+1).map((value, index) => {
            return (
              <div key={"shorts" + index} className="flex justify-center">
                <div>
                  <ShortsItem title="Title"/>
                </div>
              </div>
            )
          })}
        </ItemContainerWithTitle>
        <ItemContainerWithTitle title="라이브" link="/board/live" scrolled>
          {Array(10).fill().map((v,i)=>i+1).map((value, index) => {
            return (
              <div key={"live" + index} className="flex justify-center">
                <div>
                  <LiveItem title="Title"/>
                </div>
              </div>
            )
          })}
        </ItemContainerWithTitle>
      </>
    )
  }
  
  return (
    <>
      <div className="my-16 w-full min-w-112 px-16">
        <SearchBar initQuery={query} initHashtagListString={hashtagListString} />
      </div>
      { contentView }
    </> 
  );
}