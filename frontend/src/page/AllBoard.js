// 전체 게시판 페이지 항목

import ItemContainerWithTitle from "../components/ItemContainerWithTitle";
import ShortsItem from "../components/ShortsItem";
import LiveItem from "../components/LiveItem";
import ContentsRanking from "../components/ContentsRanking";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function AllBoard() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('query'); 
  const hashtagListParam = searchParams.get('hashtagList');
  const query = queryParam ? queryParam : ""; 
  const hashtagListString = hashtagListParam ? hashtagListParam : "";

  useEffect(() => {
    const serverUrl = process.env.REACT_APP_TEST_SERVER_BASE_URL;

    axios({
      method: "get",
      url: `${serverUrl}/content/search?title=`
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    })
  }, [])
  
  return (
    <>
      <div className="my-16 w-full min-w-112 px-16">
        <SearchBar initQuery={query} initHashtagListString={hashtagListString} />
      </div>

      {query && <p className="text-primary text-3xl font-semibold">검색어는 {query}에요~~~~~~~~~~~~~~~</p>}

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
  );
}