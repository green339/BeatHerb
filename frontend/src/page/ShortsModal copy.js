import React, { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import UploadShorts from "../page/UploadShorts.js";

import axios from "axios";
export default function ShortsModal() {
  const [modalState,setModalState]=useState(true)
  const uploadShortsModalRef = useRef();
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const buttonRef = useRef(null);
  const videoFileRef = useRef(null);
  const audioFileRef = useRef(null);
  const ffmpeg = new FFmpeg();
  const [downloadData, setDownloadData] = useState(null);

  const [musicRoot, setMusicRoot] = useState("");
  const [musicTitle, setMusicTitle] = useState("");
  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchData, setSearchData] = useState({
    vocalList: [],
    melodyList: [],
    soundTrackList: [],
  });
  const types = [
    { value: "melodyList", title: "멜로디" },
    { value: "vocalList", title: "보컬" },
    { value: "soundTrackList", title: "음원" },
  ];

  const changeInputValue = (event) => {
    setQuery(event.target.value);
  };

  const searchBtnClick = async () => {
    setIsSearch(true);
    axios({
      url: "https://node5.wookoo.shop/api/content/search?title=" + query,
      method: "GET",
    })
      .then((response) => {
        console.log("response.data", response.data.data);
        setSearchData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const clickMusicBtn = async (id, title) => {
    await beatherbMusic(id, title);
  };
  const beatherbMusic = async (id, title) => {
    axios({
      url: "http://localhost:8080/api/content/load/" + title,
      method: "GET",
      responseType: "arraybuffer",
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: "audio/mp3" }); // Blob 객체 생성
        let file = new File([blob], title + ".mp3", {
          type: "audio/mp3",
          lastModified: new Date(),
        });
        let url = URL.createObjectURL(file);
        // const url = window.URL.createObjectURL(blob);
        // setMusicUrl(url);
        setMusicTitle(title);
        setMusicRoot(id);
        audioRef.current.src = url;
        // audioRef.current.style.display = "inline";
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleAudioChange = async () => {
    const audioFile = audioFileRef.current.files[0];
    if (!audioFile) return;
    const audioUrl = URL.createObjectURL(audioFile);
    setMusicTitle(audioFile.name);

    audioRef.current.src = audioUrl;
    // audioRef.current.style.display = "inline";
    // audioRef.current.play();
  };
  const handleVideoChange = async () => {
    const videoFile = videoFileRef.current.files[0];

    if (!videoFile) return;

    const videoUrl = URL.createObjectURL(videoFile);

    videoRef.current.src = videoUrl;
    videoRef.current.style.display = "inline";
    // videoRef.current.play();
  };
  const changeUploadShortsModal = async () => {
    console.log(videoFileRef.current.files)
    if (!(videoFileRef.current.files[0] && audioFileRef.current.files[0])) {
      alert("음악 파일과 동영상 파일을 선택해주세요")
      return
    }
    buttonRef.current.textContent = "합치는 중...";
    await convertMedia();
    buttonRef.current.textContent = "합치기";
    videoRef.current.pause();
    audioRef.current.pause();
    await setModalState(false)
  };

  const convertMedia = async () => {
    await ffmpeg.load();
    const video = await videoFileRef.current.files[0].arrayBuffer();
    const audio = await audioFileRef.current.files[0].arrayBuffer();
    
    await ffmpeg.writeFile("video.mp4", new Uint8Array(video));
    await ffmpeg.writeFile("audio.mp3", new Uint8Array(audio));

    await ffmpeg.exec([
      "-i",
      "video.mp4",
      "-i",
      "audio.mp3",
      "-c:v",
      "copy",
      "-c:a",
      "aac",
      "-strict",
      "experimental",
      "output.mp4",
    ]);
    const data = await ffmpeg.readFile("output.mp4");
    const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
    setDownloadData(videoBlob);
    // const videoUrl = URL.createObjectURL(videoBlob);
    // const link = document.createElement("a");
    // link.href = videoUrl;
    // link.download = "output.mp4";
    // link.click();
  };

  return (
    <div className="w-full h-full">
      <div className="text-4xl pb-10">쇼츠 올리기</div>
      {modalState ?
        <div>
          <div className="w-full p-10">
            <div className="w-full flex h-3/6">
              <div className="w-4/12 text-left">
                <p
                  className="pb-3"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                  선택한 음악: {musicTitle}
                </p>
                <input
                  type="file"
                  ref={audioFileRef}
                  onChange={handleAudioChange}
                  style={{ display: "none" }}
                  accept="audio/*"
                />
                <button
                  className="btn btn-primary btn-xs"
                  onClick={() => {
                    audioFileRef.current.click();
                  }}>
                  음악 파일 선택
                </button>
                <div
                  className="flex pt-10"
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <audio ref={audioRef} controls style={{ display: "none" }}></audio>
                </div>
                <div className="w-full flex">
                  <div className="w-3/4 text-left whitespace-nowrap pb-2 pr-10 mx-6">
                    BeatHerb에서 가져오기
                  </div>
                </div>

                <div className="flex">
                  <input
                    type="text"
                    placeholder="찾을 음원 제목을 입력해주세요."
                    className="input input-ghost w-full mx-3"
                    value={query}
                    onChange={changeInputValue}
                  />
                  <button onClick={searchBtnClick} className="btn btn-primary btn-m">
                    검색
                  </button>
                </div>
                {isSearch ? (
                  <div className="px-10 grid grid-cols-1 pt-10 gap-4 max-h-48">
                    <div className="max-h-48" style={{ overflow: "scroll", overflowX: "hidden" }}>
                      {types.map((type) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                          }}
                          key={type.value}>
                          <p className="text-left">{type.title}</p>
                          <div>
                            {/* <div className="max-h-48" style={{ overflow: "scroll", overflowX: "hidden" }}> */}
                            {searchData[type.value].map((value, index) => (
                              <div
                                className="w-full flex bg-neutral-700 p-2 rounded-xl"
                                key={value.id}
                                onClick={() => clickMusicBtn(value.id, value.title)}>
                                <p
                                  className="text-base-content m-1 w-2/3"
                                  style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    justifyItems: "start",
                                    textAlign: "start",
                                  }}>
                                  {value.title}
                                </p>
                                <p
                                  className="text-base-content m-1 w-1/3"
                                  style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}>
                                  {value.creatorList.map((value, index) => (
                                    <span key={index}>{value.nickname} </span> // 배열의 각 항목을 화면에 표시
                                  ))}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="w-8/12 ps-10 text-left">
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
                  }}>
                  동영상 선택
                </button>
                <div className="flex pt-3" style={{ justifyContent: "center", alignItems: "center" }}>
                  <video ref={videoRef} controls style={{ display: "none", height: "400px" }}></video>
                </div>
              </div>

              <div></div>
            </div>
            <div
              className="flex w-full h-3/6 mt-10 "
              style={{ justifyContent: "center", alignItems: "center" }}>
              <button ref={buttonRef} onClick={changeUploadShortsModal}>
                합치기
              </button>
            </div>
          </div>
        </div>
        : <div>
          <button onClick={()=>setModalState(true)}>뒤로가기</button>
          {/* <dialog ref={uploadShortsModalRef} className="modal"> */}
            <UploadShorts shorts={downloadData} />
          {/* </dialog> */}
        </div>}
    </div>
  );
}
