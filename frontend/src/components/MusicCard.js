import React, { forwardRef, useRef,useEffect, useState, useImperativeHandle } from "react";
import Hls from 'hls.js';

import { useDrag } from "react-dnd";

const MusicCard = forwardRef(({ audio, childPosChange }, ref) => {
  const [audioData, setAudioData] = useState(audio);
  const audioRef = useRef(null);
  useImperativeHandle(ref, () => ({
    playMusic,
    pauseMusic,
  }));
  const onDragStart = (event) => {
    event.dataTransfer.setData("application/reactflow", "");
    event.dataTransfer.setDragImage(new Image(), 0, 0);
  };

  const onDrag = (event) => {
    setAudioData((audio) => (audio = { ...audio, x: event.clientX, y: event.clientY }));
    console.log(event.clientX,event.clientY)
    childPosChange(event.clientX, event.clientY, audio.id);
  };

  const handleLoadedMetadata = (event) => {
    const duration = event.target.duration;
    setAudioData((prevData) => (prevData = { ...audio, duration }));
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { id: audio.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log(monitor);
    },
  }));

  const playMusic = () => {
    audioRef.current.play();
  };
  const pauseMusic = () => {
    audioRef.current.pause();
  };

  useEffect(() => {
    if (Hls.isSupported() && audioData.id===3) {
      console.log(audioData)
      const hls = new Hls();
      hls.loadSource(audioData.src);
      hls.attachMedia(audioRef.current);
    } else {
      audioRef.current.src=audioData.src
    }
  }, [audioRef]);


  return (
    <div
      ref={drag}
      id={audioData.id}
      key={audioData.id}
      draggable
      onDragStart={onDragStart}
      onDrag={onDrag}
      style={{
        height: "50px",
        width: `${audio.duration || 0}px`, // 재생 시간에 비례하여 길이를 설정
        background: "blue",
        position: "absolute",
        left: `${audioData.x}px`,
        top: `${audioData.y}px`,
      }}
    >
      <video
        controls
        key={audioData.id}
        ref={audioRef}
        src={audioData.src}
        onLoadedMetadata={(event) => handleLoadedMetadata(event)}
      />
      {audioData.id}
    </div>
  );
});

export default MusicCard;
