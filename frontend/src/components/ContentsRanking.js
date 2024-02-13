// 주제에 대해서 Top 5 항목을 보여주는 컴포넌트

import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import defaultContent from "../assets/default_content.jpeg"

export default function ContentsRanking({ title, link, data, contentList = [] }) {
  const navigate = useNavigate();
  
  const itemList = contentList.map((content, index) => {
    return (
      <Fragment key={"Rank" + (index + 1)}>
        <div className="divider my-1" />
        <div className="flex place-content-between items-center h-14">
          <div className="flex gap-2 items-center">
            <p className="text-base-content m-0">{index + 1}. </p>
            <img className="w-12 rounded-md" src={content.image ? content.image : defaultContent} alt=""/>
            <p className="text-base-content m-0">{content.title}</p>
          </div>
          <p className="text-base-content m-0">Artist</p>
        </div>
      </Fragment>
    )
  })

  while(itemList.length < 5) {
    itemList.push(
      <Fragment key={"Rank" + (itemList.length + 1)}>
        <div className="divider my-1" />
        <div className="flex place-content-between items-center h-14">
          <div className="flex gap-2 items-center" />
        </div>
      </Fragment>
    )
  }

  const handleOnClick = () => {
    navigate(link, { state: { ...data } });
  }
  
  return (
    <div className="w-full p-8 flex flex-col bg-base-200 rounded-lg">
      <div className="flex place-content-between">
        <p className="text-base-content text-xl font-semibold m-0">{title}</p>
        <button className="text-base-content" onClick={handleOnClick}>더보기</button>
      </div>
      { itemList }
    </div>
  );
}