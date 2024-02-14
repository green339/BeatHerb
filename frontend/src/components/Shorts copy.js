import React, { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import UploadShorts from "../page/UploadShorts.js";

export default function Shorts() {
  const uploadShortsModalRef = useRef();
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const buttonRef = useRef(null);
  const videoFileRef = useRef(null);
  const audioFileRef = useRef(null);
  const ffmpeg = new FFmpeg();
  const [downloadData, setDownloadData] = useState(null);

  const handleVideoChange = async () => {
    const videoFile = videoFileRef.current.files[0];

    if (!videoFile) return;

    const videoUrl = URL.createObjectURL(videoFile);

    videoRef.current.src = videoUrl;
    videoRef.current.style.display = "inline";
    // videoRef.current.play();
  };
  const handleAudioChange = async () => {
    const audioFile = audioFileRef.current.files[0];
    if (!audioFile) return;

    const audioUrl = URL.createObjectURL(audioFile);

    audioRef.current.src = audioUrl;
    audioRef.current.style.display = "inline";
    // audioRef.current.play();
  };

  const openUploadShortsModal = async () => {
    buttonRef.current.textContent = "합치는 중...";
    await convertMedia();
    buttonRef.current.textContent = "합치기";
    videoRef.current.pause();
    audioRef.current.pause();
    await uploadShortsModalRef.current.showModal();
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
    console.log(data);
    console.log(data.buffer);
    const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
    setDownloadData(videoBlob);
    const videoUrl = URL.createObjectURL(videoBlob);
    console.log(videoUrl);
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = "output.mp4";
    link.click();
  };

  return (
    <div className="w-full p-10">
      <div className="w-full flex h-3/6">
        <div className="w-4/12">
          <input
            type="file"
            ref={audioFileRef}
            onChange={handleAudioChange}
            style={{ display: "none" }}
            accept="audio/*"
          />
          <button
            onClick={() => {
              audioFileRef.current.click();
            }}>
            음악 선택
          </button>
          <div className="flex pt-10" style={{ justifyContent: "center", alignItems: "center" }}>
            <audio ref={audioRef} controls style={{ display: "none" }}></audio>
          </div>
        </div>
        <div className="w-8/12">
          <input
            type="file"
            ref={videoFileRef}
            accept="video/*"
            onChange={handleVideoChange}
            style={{ display: "none" }}
          />
          <button
            onClick={() => {
              videoFileRef.current.click();
            }}>
            동영상 선택
          </button>
          <div className="flex pt-10" style={{ justifyContent: "center", alignItems: "center" }}>
            <video ref={videoRef} controls style={{ display: "none", height: "400px" }}></video>
          </div>
        </div>

        <div></div>
      </div>
      <div
        className="flex w-full h-3/6 mt-10 "
        style={{ justifyContent: "center", alignItems: "center" }}>
        <button ref={buttonRef} onClick={openUploadShortsModal}>
          합치기
        </button>
      </div>
      <dialog ref={uploadShortsModalRef} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <UploadShorts shorts={downloadData} />
        </div>
      </dialog>
    </div>
  );
}
