import React, { forwardRef,useRef, useState,useImperativeHandle } from "react";
import { useDrag } from 'react-dnd';

const MusicCard = forwardRef(({ audio }, ref ) => {
  const [audioData, setAudioData] = useState(audio);
  const [position,setPosition]=useState({ x: 100, y: 50 })  
  const audioRef = useRef(null);
  useImperativeHandle(ref, () => ({
    playMusic,pauseMusic
  }))

  const handleLoadedMetadata = (event) => {
    const duration = event.target.duration;
    setAudioData((prevData) =>
      prevData = { ...audio, duration }
    );
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'div',
    item: {id:audio.id},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log(monitor)
    },
  }));
  
  const playMusic = () => {
    audioRef.current.play()
  }
  const pauseMusic = () => {
    audioRef.current.pause()
  }

  return (
    <div
      ref={drag}
      id={audio.id}
      key={audio.id}
      style={{
        height: "50px",
        width: `${audio.duration || 0}px`, // 재생 시간에 비례하여 길이를 설정
        background: "blue",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y * audio.id}px`,
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
