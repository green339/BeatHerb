// 인기 게시판 페이지 항목

import ItemContainerWithTitle from "../components/ItemContainerWithTitle";
import ContentsRanking from "../components/ContentsRanking";

const periodList = ["daily", "weekly", "monthly"];

export default function PopularityBoard() {
  return (
    <>
      <ItemContainerWithTitle title="멜로디" link="/board/contents" data={{ category: "melody", sortOption: "popularity" }} >
        {
          periodList.map((period) => (
            <ContentsRanking
              key={"melody " + period}
              title={period} 
              link="/board/contents" 
              data={{ category: "melody", sortOption: "popularity" }} 
            />
          ))
        }
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="보컬" link="/board/contents" data={{ category: "vocal", sortOption: "popularity" }} >
        {
          periodList.map((period) => (
            <ContentsRanking 
              key={"vocal " + period}
              title={period} 
              link="/board/contents" 
              data={{ category: "vocal", sortOption: "popularity" }} 
            />
          ))
        } 
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="음원" link="/board/contents" data={{ category: "music", sortOption: "popularity" }} >
        {
          periodList.map((period) => (
            <ContentsRanking 
              key={"music " + period}
              title={period} 
              link="/board/contents" 
              data={{ category: "music", sortOption: "popularity" }} 
            />
          ))
        } 
      </ItemContainerWithTitle>
    </>
  );
}