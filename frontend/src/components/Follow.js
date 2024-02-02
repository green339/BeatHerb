//팔로우 팔로워 모달 컴포넌트
import { useState, useEffect } from "react";

const tabs = [
  { value: "follower", title: "팔로워" },
  { value: "following", title: "팔로잉" },
];

export default function Follow({ followType }) {
  const [follow, setFollow] = useState(followType);

  useEffect(() => {
    setFollow(followType);
  }, [followType]);

  const tempArray = Array(10)
    .fill()
    .map((v, i) => i + 1);

  let followList = null;

  if (follow === "follower") {
    followList = tempArray.map((value, index) => (
      <div key={index} className="flex justify-center">
        <div className="flex">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="w-52 h-12">Alex</div>
          <button className="flex px-3 md:px-4 py-1 md:py-2 bg-base-100 text-white rounded-lg hover:bg-base-200">
            삭제
          </button>
        </div>
      </div>
    ));
  } else if (follow === "following") {
    followList = tempArray.map((value, index) => (
      <div key={index} className="flex justify-center"></div>
    ));
  }

  return (
    <div>
      <div role="tablist" className="tabs tabs-bordered my-8 tabs-lg">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            className={"tab w-1/2 translate-x-1/2" + (follow === tab.value ? " tab-active" : "")}
            onClick={() => setFollow(tab.value)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 items-center scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-base-200 hover:scrollbar-thumb-primary overflow-y-scroll">
        {followList}
      </div>
    </div>
  );
}
