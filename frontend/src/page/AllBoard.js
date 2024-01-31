// 전체 게시판 페이지 항목

import ItemContainerWithTitle from "../components/ItemContainerWithTitle";
import ShortsItem from "../components/ShortsItem";
import LiveItem from "../components/LiveItem";
import ContentsRanking from "../components/ContentsRanking";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";

export default function AllBoard() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); 
  
  return (
    <>
      <div className="my-16 w-full min-w-112 px-16">
        <SearchBar initQuery={query} />
      </div>

      {query && <h1 className="text-primary">검색어는 {query}에요~~~~~~~~~~~~~~~</h1>}

      <ItemContainerWithTitle title="컨텐츠" link="/board/contents">
        <ContentsRanking title="신규 멜로디" link="/board/contents" data={{ category: "melody" }} />
        <ContentsRanking title="신규 보컬" link="/board/contents" data={{ category: "vocal" }} />
        <ContentsRanking title="신규 음원" link="/board/contents" data={{ category: "music" }} />
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="Shorts" link="/board/shorts" scrolled>
        {Array(10).fill().map((v,i)=>i+1).map((value, index) => {
          return (
            <div key={index} className="flex justify-center">
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
            <div key={index} className="flex justify-center">
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