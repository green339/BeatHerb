// 전체 게시판 페이지 항목

import ItemContainerWithTitle from "../components/ItemContainerWithTitle";
import ShortsItem from "../components/ShortsItem";
import LiveItem from "../components/LiveItem";
import ContentsRanking from "../components/ContentsRanking";

export default function AllBoard() {
  return (
    <>
      <ItemContainerWithTitle title="컨텐츠" link="/board/contents">
        <ContentsRanking title="신규 멜로디" />
        <ContentsRanking title="신규 보컬" />
        <ContentsRanking title="신규 음원" />
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