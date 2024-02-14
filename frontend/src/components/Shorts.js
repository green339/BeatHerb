import React, { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import SearchMusic from "../components/SearchMusic.js";
export default function Shorts({ getChildShorts,getClearState }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const buttonRef = useRef(null);
  const videoFileRef = useRef(null);
  const audioFileRef = useRef(null);
  const ffmpeg = new FFmpeg();

  const [musicRoot, setMusicRoot] = useState("");
  const [musicTitle, setMusicTitle] = useState("");
  const clear = async () => {
    audioRef.current = null;
    videoRef.current = null;
    videoFileRef.current = null;
    audioFileRef.current = null;
    setMusicRoot("")
    setMusicTitle("")
    getClearState();//이 컴포넌트 닫는다고 알려줌
  };
  const getChildSearchResult = (url, title, id) => {
    console.log(url, title, id);
    // setMusicUrl(url);
    setMusicTitle(title);
    setMusicRoot(id);
    audioRef.current.src = url;
    // audioRef.current.style.display = "inline";
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
    if (!(videoFileRef.current.files[0] && audioFileRef.current.files[0])) {
      alert("음악 파일과 동영상 파일을 선택해주세요");
      return;
    }
    buttonRef.current.textContent = "합치는 중...";
    buttonRef.current.disabled = true;
    await convertMedia();
    buttonRef.current.textContent = "합치기";
    videoRef.current.pause();
    audioRef.current.pause();
    buttonRef.current.disabled = false;
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
    getChildShorts(videoBlob, musicRoot);
    // const videoUrl = URL.createObjectURL(videoBlob);
    // const link = document.createElement("a");
    // link.href = videoUrl;
    // link.download = "output.mp4";
    // link.click();
  };

  return (
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
            <div className="flex pt-10" style={{ justifyContent: "center", alignItems: "center" }}>
              <audio ref={audioRef} controls style={{ display: "none" }}></audio>
            </div>
            <div className="w-full flex">
              <div className="w-3/4 text-left whitespace-nowrap pb-2 pr-10 mx-6">
                BeatHerb에서 가져오기
              </div>
            </div>
            <SearchMusic getChildSearchResult={getChildSearchResult}></SearchMusic>
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
          <div className="modal-action px-3">
          <button ref={buttonRef} onClick={changeUploadShortsModal}>
            합치기
          </button></div>
          <div className="modal-action px-3">
            <button className="btn" onClick={clear}>
              취소하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
