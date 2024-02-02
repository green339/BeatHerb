// 유저 마이페이지

import NavBar from "../components/NavBar";
import ContentsItem from "../components/ContentsItem";
import { useRef, useState } from "react";
import ShortsItem from "../components/ShortsItem";
import LiveItem from "../components/LiveItem";
import Dm from "../components/Dm";
import Follow from "../components/Follow";

// 탭 리스트
const tabs = [
  { value: "melody", title: "멜로디" },
  { value: "vocal", title: "보컬" },
  { value: "music", title: "음원" },
  { value: "shorts", title: "Shorts" },
  { value: "live", title: "라이브" },
];

export default function MyPage() {
  const [category, setCategory] = useState("melody");

  const [followType, setFollowType] = useState("follower");
  const followModalRef = useRef();

  const handleClickFollower = () => {
    setFollowType("follower");
    followModalRef.current?.showModal();
  };

  const handleClickFollowing = () => {
    setFollowType("following");
    followModalRef.current?.showModal();
  };

  const dmModalRef = useRef();
  const tempArray = Array(20)
    .fill()
    .map((v, i) => i + 1);

  let itemList = null;

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

  return (
    <>
      <div>
        <div className="fixed w-full top-0 z-10">
          <NavBar />
        </div>
        <div className="pt-20 mx-8">
          <div className="mx-4 flex place-content-between">
            <div className="flex gap-4">
              <div className="flex place-items-center">
                <div className="w-32 h-32 rounded-md">
                  <img
                    className="w-full rounded-md"
                    src="https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-2">
                <p className="text-base-content text-left text-3xl font-semibold">BeatHerb</p>
                <p className="text-base-content text-left">총 좋아요 수: 123456789</p>
                <div className="flex gap-1 flex-wrap">
                  <div className="badge badge-lg badge-primary text-primary-content">primary</div>
                  <div className="badge badge-lg badge-primary text-primary-content">primary</div>
                  <div className="badge badge-lg badge-primary text-primary-content">primary</div>
                  <div className="badge badge-lg badge-primary text-primary-content">primary</div>
                  <div className="badge badge-lg badge-primary text-primary-content">primary</div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="stats shadow">
                <div
                  className="stat place-items-center cursor-pointer hover:bg-base-200"
                  onClick={handleClickFollower}
                >
                  <div className="stat-title">팔로워</div>
                  <div className="stat-value font-semibold text-3xl">998,244,353</div>
                </div>
                <div
                  className="stat place-items-center cursor-pointer hover:bg-base-200"
                  onClick={handleClickFollowing}
                >
                  <div className="stat-title">팔로잉</div>
                  <div className="stat-value text-secondary font-semibold text-3xl">
                    1,000,000,007
                  </div>
                </div>
              </div>
              <div className="flex place-items-center">
                <button className="btn btn-ghost" onClick={() => dmModalRef.current?.showModal()}>
                  <svg
                    className="fill-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    height="32"
                    viewBox="0 -960 960 960"
                    width="32"
                  >
                    <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                  </svg>
                </button>
              </div>
            </div>
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
          <div className="grid grid-cols-4 gap-4 items-center scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-base-200 hover:scrollbar-thumb-primary overflow-y-scroll">
            {itemList}
          </div>
        </div>
      </div>
      <dialog className="modal" ref={dmModalRef}>
        <div className="modal-box w-11/12 max-w-5xl bg-base-200">
          <Dm />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog className="modal" ref={followModalRef}>
        <div className="modal-box w-11/12 max-w-5xl bg-base-200">
          <Follow followType={followType} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
