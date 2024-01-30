// 인기 게시판 페이지 항목

import ItemContainerWithTitle from "../components/ItemContainerWithTitle";
import ContentsRanking from "../components/ContentsRanking";

export default function PopularityBoard() {
  return (
    <>
      <ItemContainerWithTitle title="멜로디" link="/board/contents">
        <ContentsRanking title="daily" link="/board/contents" />
        <ContentsRanking title="weekly" link="/board/contents" />
        <ContentsRanking title="monthly" link="/board/contents" />
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="보컬" link="/board/contents">
        <ContentsRanking title="daily" link="/board/contents" />
        <ContentsRanking title="weekly" link="/board/contents" />
        <ContentsRanking title="monthly" link="/board/contents" />
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="음원" link="/board/contents">
        <ContentsRanking title="daily" link="/board/contents" />
        <ContentsRanking title="weekly" link="/board/contents" />
        <ContentsRanking title="monthly" link="/board/contents" />
      </ItemContainerWithTitle>
    </>
  );
}