import React, { useEffect, useRef, useState } from "react";

const MusicEdit = () => {
  const audios = [
    {
      id: 1,
      src: "https://p.scdn.co/mp3-preview/0ba9d38f5d1ad30f0e31fc8ee80c1bebf0345a0c",
      position: 10,
    },
    {
      id: 2,
      src: "https://p.scdn.co/mp3-preview/0ba9d38f5d1ad30f0e31fc8ee80c1bebf0345a0c",
      position: 20,
    },
  ];
  const [barPosition, setBarPosition] = useState(0);
  const audioRefs = useRef([]);
  const [audioData, setAudioData] = useState(audios);
  const [playAll, setPlayAll] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setAudioData((prevAudios) => [
      ...prevAudios,
      { id: prevAudios.length + 1, src: url, position: 15 },
    ]);
  };
  const buttonClick = () => {
    setPlayAll(!playAll);
    console.log(playAll);
  };
  const handleLoadedMetadata = (event, id) => {
    const duration = event.target.duration;
    console.log(duration);
    console.log(audioData);
    setAudioData((prevData) =>
      prevData.map((audio) => (audio.id == id ? { ...audio, duration } : audio))
    );
  };
  useEffect(() => {
    let interval = null;

    if (playAll) {
      interval = setInterval(() => {
        setBarPosition((prevPosition) => prevPosition + 1);
      }, 1000);
    } else if (!playAll) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [playAll]);

  useEffect(() => {
    audios.forEach((audio, index) => {
      if (barPosition >= audio.position) {
        audioRefs.current[index].play();
      }
    });
  }, [barPosition, audios]);

  useEffect(() => {
    audios.forEach((audio, index) => {
      if (!playAll) {
        audioRefs.current[index].pause();
      }
    });
  }, [barPosition, audios, playAll]);

  return (
    <div>
      <button onClick={buttonClick}>{playAll ? "일시정지" : "재생"}</button>
      <input type="file" onChange={handleFileUpload} />
      <div

        style={{ overflow: "scroll", width: "3000px", height: "500px", overflowY: "hidden" }}>
        <div style={{ height: "10px", width: `${barPosition}px`, background: "blue" }} />
        <div>
          {audioData.map((audio, index) => (
            <div
              draggable="true"
              id={audio.id}
              key={audio.id}
              style={{
                height: "50px",
                width: `${audio.duration || 0}px`, // 재생 시간에 비례하여 길이를 설정
                background: 'blue',
              }}>
              <audio
                key={audio.id}
                ref={(el) => (audioRefs.current[index] = el)}
                src={audio.src}
                onLoadedMetadata={(event) => handleLoadedMetadata(event, audio.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
      
};

export default MusicEdit;
