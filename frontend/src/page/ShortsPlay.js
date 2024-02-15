import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";
import Hls from 'hls.js';
const ShortsPlay = forwardRef(({ selected }, ref) => {
  useImperativeHandle(ref, () => ({
    clear,
  }));
  const shorts = {
    nickname: "닉네임",
    root: 2,
    title: "제목",
    src: "쇼츠 플레이 링크",
  };
  
  // const serverUrl = process.env.REACT_APP_TEST_SERVER_BASE_URL;
  // const src_link = `${serverUrl}/shorts/play/${shorts.id}`;
  const videoRef = useRef(null);
  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(shorts.src);
      hls.attachMedia(videoRef.current);
    }
    return () => {};
  }, [videoRef.current]);

  // const videoFileRef = useRef(null);
  // const videoSelBtnRef = useRef(null);
  // const handleVideoChange = async () => {
  //   const videoFile = videoFileRef.current.files[0];
  //   if (!videoFile) return;
  //   const videoUrl = URL.createObjectURL(videoFile);
  //   videoRef.current.src = videoUrl;
  //   videoRef.current.style.display = "inline";
  //   // videoRef.current.play();
  // };
  const clear = () => {
    videoRef.current.src = null;
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="modal-action text-right">
        <form method="dialog">
          <button className="btn" onClick={clear}>
            닫기
          </button>
        </form>
      </div>
      <p className="text-left font-bold text-3xl">{shorts.title}</p>
      <div className="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <p className="text-left text-l">{shorts.nickname}</p>
      </div>
      <div className="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
          />
        </svg>
        <Link to={`/content/${shorts.root}`}>
          {/* <p className="text-left text-l">{shorts.root}</p> */}
          <p className="text-left text-l">{selected}</p>
        </Link>
      </div>
      <div className="p-3">
        {/* <video src={shorts.src} controls style={{ width: "700px" }}></video> */}
        <video ref={videoRef} controls style={{ width: "700px" }}></video>
        {/* 이건 파일 실행되는지 테스트용 -지우기 */}
        {/* <div className="w-8/12 ps-10 text-left">
          <input
            type="file"
            ref={videoFileRef}
            accept="video/*"
            onChange={handleVideoChange}
            style={{ display: "none" }}
          />
          <button
            className="btn btn-primary btn-xs"
            onClick={() => {
              videoFileRef.current.click();
            }}
            ref={videoSelBtnRef}
          >
            동영상 선택
          </button>
        </div> */}
      </div>
    </div>
  );
});
export default ShortsPlay;
