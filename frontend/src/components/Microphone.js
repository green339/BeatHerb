import React, { useRef, useState } from 'react';

const Microphone = () => {
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const handleDataAvailable = (e) => {
    if (e.data.size > 0) {
        const url = URL.createObjectURL(e.data);
        console.log(url)
      setAudioURL(url);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={recording ? handleStopRecording : handleStartRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && <audio controls src={audioURL}></audio>}
    </div>
  );
};

export default Microphone;