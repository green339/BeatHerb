// 주제에 대해서 Top 5 항목을 보여주는 컴포넌트

import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function ContentsRanking({ title, link, data }) {
  const navigate = useNavigate();
  
  const itemList = [1, 2, 3, 4, 5].map((value) => {
    return (
      <Fragment key={value}>
        <div className="divider my-1" />
        <div key={value} className="flex place-content-between items-center">
          <div className="flex gap-2 items-center">
            <p className="text-base-content m-0">{value}. </p>
            <img className="w-12 rounded-md" src="https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04" alt=""/>
            <p className="text-base-content m-0">title</p>
          </div>
          <p className="text-base-content m-0">Artist</p>
        </div>
      </Fragment>
    )
  })

  const handleOnClick = () => {
    navigate(link, { state: { ...data } });
  }
  
  return (
    <div className="w-full p-8 flex flex-col bg-base-200 rounded-lg">
      <div className="flex place-content-between">
        <h3 className="text-base-content m-0">{title}</h3>
        <button className="text-base-content" onClick={handleOnClick}>더보기</button>
      </div>
      { itemList }
    </div>
  );
}