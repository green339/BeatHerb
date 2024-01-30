// 전체 게시판 페이지 항목

import ItemContainerWithTitle from "../components/ItemContainerWithTitle";
import ShortsItem from "../components/ShortsItem";
import LiveItem from "../components/LiveItem";
import ContentsRanking from "../components/ContentsRanking";

export default function AllBoard() {
  return (
    <>
      <ItemContainerWithTitle title="컨텐츠" link="/board/contents">
        <div className="flex gap-8">
          <ContentsRanking title="신규 멜로디" />
          <ContentsRanking title="신규 보컬" />
          <ContentsRanking title="신규 음원" />
        </div>
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="Shorts" link="/board/shorts">
        <div className="flex scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-base-200 hover:scrollbar-thumb-primary overflow-x-scroll gap-4">
          {Array(10).fill().map((v,i)=>i+1).map((value, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <div>
                    <ShortsItem title="Title"/>
                  </div>
                </div>
              )
          })}
        </div>
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="라이브" link="/board/live">
        <div className="flex scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-base-200 hover:scrollbar-thumb-primary overflow-x-scroll gap-4">
          {Array(10).fill().map((v,i)=>i+1).map((value, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <div>
                    <LiveItem title="Title"/>
                  </div>
                </div>
              )
          })}
        </div>
      </ItemContainerWithTitle>
    </>
  );
}