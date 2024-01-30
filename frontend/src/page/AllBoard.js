// 전체 게시판 페이지 항목

import ItemContainerWithTitle from "../components/ItemContainerWithTitle";
import ContentsItem from "../components/ContentsItem";
import ShortsItem from "../components/ShortsItem";
import LiveItem from "../components/LiveItem";

export default function AllBoard() {
  return (
    <>
      <ItemContainerWithTitle title="컨텐츠" link="/board/contents">
        <div className="flex overflow-x-scroll gap-4">
          {Array(10).fill().map((v,i)=>i+1).map((value, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <div>
                    <ContentsItem size={150} title="Title"/>
                  </div>
                </div>
              )
          })}
        </div>
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="Shorts" link="/board/shorts">
        <div className="flex overflow-x-scroll gap-4">
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
        <div className="flex overflow-x-scroll gap-4">
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