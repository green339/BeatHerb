// 상세페이지

import NavBar from "../components/NavBar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ContentsItem from "../components/ContentsItem";
import ShortsItem from "../components/ShortsItem";
import LiveItem from "../components/LiveItem";

const tabs = [
  { value: "melody", title: "멜로디" },
  { value: "vocal", title: "보컬" },
  { value: "music", title: "음원" },
  { value: "shorts", title: "Shorts" },
  { value: "live", title: "라이브" },
];

const commenttabs = [
  { value: "comment", title: "댓글" },
  { value: "lyrics", title: "가사" },
];

export default function ContentDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState("melody");
  const [comment, setComment] = useState("comment");

  const tempArray = Array(20)
    .fill()
    .map((v, i) => i + 1);

  let itemList = null;
  let commentList = null;

  if (category === "melody" || category === "vocal" || category === "music") {
    itemList = tempArray.map((value, index) => (
      <div key={index} className="flex justify-center">
        <ContentsItem contentsId={value} size={150} title={category} showFavorite={false} />
      </div>
    ));
  } else if (category === "shorts") {
    itemList = tempArray.map((value, index) => (
      <div key={index} className="flex justify-center">
        <ShortsItem title={category} />
      </div>
    ));
  } else if (category === "live") {
    itemList = tempArray.map((value, index) => (
      <div key={index} className="flex justify-center">
        <LiveItem title={category} />
      </div>
    ));
  }

  if (comment === "comment") {
    commentList = tempArray.map((value, index) => (
      <div key={index} className="flex justify-center m-10">
        <div className="flex w-full mt-2 space-x-3">
          <div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div className="text-xs text-gray-500 leading-none">Alex</div>
          </div>
          <div>
            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 leading-none">2 min ago</div>
            </div>
          </div>
        </div>
      </div>
    ));
  } else if (comment === "lyrics") {
    commentList = <div className="flex justify-center">나는 나비 날개를 활짝 펴고</div>;
  }

  return (
    <div className="h-full">
      <div className="fixed top-0 w-full z-10">
        <NavBar />
      </div>
      <div className="pt-[64px] mx-8">
        <div className="mx-3 flex place-content-between">
          <div className="flex gap-4 w-7/12">
            <div className="flex flex-col">
              <div className="w-52 h-52 rounded-md">
                <img
                  className="w-full rounded-md"
                  src="https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04"
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-52 h-20 rounded-md">
                <button className="flex px-3 md:px-4 py-1 md:py-2 bg-base-100 text-white rounded-lg hover:bg-base-200">
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  Play
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <div className="text-base-content text-left">{id}번 음원 상세 페이지</div>
              <p className="text-base-content text-left">가수</p>
              <div className="flex gap-1 flex-wrap">
                <div className="badge badge-lg badge-primary text-primary-content">primary</div>
                <div className="badge badge-lg badge-primary text-primary-content">primary</div>
                <div className="badge badge-lg badge-primary text-primary-content">primary</div>
                <div className="badge badge-lg badge-primary text-primary-content">primary</div>
                <div className="badge badge-lg badge-primary text-primary-content">primary</div>
              </div>
              <div className="text-left">진입차수 : </div>
            </div>
          </div>
          <div className="flex w-5/12 rounded-md bg-base-200 px-4 items-center text-left">
            이 노래는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 듣는 사람에게 행운을
            주었고지금은 당신에게로 옮겨진 이 노래는 4일 안에 당신 곁을 떠나야 합니다. 이 노래를
            포함해서7곡을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 ...더보기
          </div>
        </div>
        <div className="flex">
          <div className="w-7/12 bg-base-200 rounded-md">
            <div className="flex h-14 items-bottom justify-center items-end text-xl">
              이 허브에 사용된
            </div>
            <div role="tablist" className="tabs tabs-bordered my-8 tabs-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  role="tab"
                  className={
                    "tab w-1/2 translate-x-1/2" + (category === tab.value ? " tab-active" : "")
                  }
                  onClick={() => setCategory(tab.value)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div
              className={`grid gap-4 items-center scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-base-200 hover:scrollbar-thumb-primary overflow-y-scroll  h-[30rem] overflow-auto ${
                category === "live"
                  ? "grid-cols-2"
                  : category === "shorts"
                  ? "grid-cols-3"
                  : "grid-cols-4"
              }`}
            >
              {itemList}
            </div>
          </div>
          <div className="w-5/12 rounded-md bg-primary">
            <div role="tablist" className="tabs tabs-bordered my-8 tabs-lg">
              {commenttabs.map((tab2) => (
                <button
                  key={tab2.value}
                  role="tab"
                  className={
                    "tab w-1/2 translate-x-1/2" + (comment === tab2.value ? " tab-active" : "")
                  }
                  onClick={() => setComment(tab2.value)}
                >
                  {tab2.title}
                </button>
              ))}
            </div>
            <div className="bg-base-200 rounded-md m-4 h-[33rem] overflow-auto">{commentList}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
