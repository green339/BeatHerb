import React, { forwardRef, useRef, useState, useImperativeHandle } from "react";
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

  return (
    <div
      ref={drag}
      id={audio.id}
      key={audio.id}
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
      <audio
        controls
        key={audio.id}
        ref={audioRef}
        src={audio.src}
        onLoadedMetadata={(event) => handleLoadedMetadata(event)}
      />
      {audio.id}
    </div>
  );
});

export default MusicCard;
