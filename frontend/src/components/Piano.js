import * as Tone from "tone"
import React, { useEffect,useState } from 'react';

const Piano = ({ getRecordResult }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [playPiano, setPlayPiano] = useState(null)
  const [result, setResult] = useState(null);

  useEffect(() => {
    Tone.loaded().then(() => {
      console.log("Audio is loaded");
      const newRecorder = new Tone.Recorder();
      setRecorder(newRecorder);

      const newPlayPiano = new Tone.Sampler({
        urls: {
          C4: "C4.mp3",
          "D#4": "Ds4.mp3",
          "F#4": "Fs4.mp3",
          A4: "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
      }).toDestination().connect(newRecorder);
      setPlayPiano(newPlayPiano);
    });
  }, []);

  const playNote = (note) => {
    playPiano.triggerAttackRelease(note, 4);
  }
  
  const startRecording = async () => {
    await recorder.start();
    setIsRecording(true)
  }

  const stopRecording = async () => {
    if (isRecording) {
      setIsRecording(false)
      const recording = await recorder.stop();
      setResult(recording)
      // const url = URL.createObjectURL(recording);//blob객체
      // const audio = new Audio(url)
    }
  }

  const playRecording = () => {
    const url = URL.createObjectURL(result);//blob객체
    const audio = new Audio(url)
    audio.play()
  }

  const uploadRecording = () => {
    const url = URL.createObjectURL(result);//blob객체
    getRecordResult(url)
    console.log("upload")
  }

  const whiteKey = {
    border: '1px solid #000000',
    width: '50px',
    height: '100px',
    backgroundColor: '#FFFFFF'

  }
  const blackKey = {
    border: '1px solid #000000',
    width: '60px',
    height: '50px',
    marginLeft: '-30px',
    marginRight:'-30px',
    backgroundColor: '#000000'
  }

  return (
    <div>
      <button onClick={startRecording}>
        녹음하기
      </button>
      <button onClick={stopRecording}>
        멈추기
      </button>
      <button onClick={playRecording}>
        플레이하기
      </button>
      <button onClick={uploadRecording}>
        작업실로 올리기
      </button>
      <div className="flex">
      <div style={whiteKey} onClick={() => playNote('C4')}>1</div>
      <div style={blackKey} onClick={() => playNote('C#4')}>2</div>
      <div style={whiteKey} onClick={() => playNote('D4')}>3</div>
      <div style={blackKey} onClick={() => playNote('D#4')}>4</div>
      <div style={whiteKey} onClick={() => playNote('E4')}>5</div>
      <div style={whiteKey} onClick={() => playNote('F4')}>6</div>
      <div style={blackKey} onClick={() => playNote('F#4')}>7</div>
      <div style={whiteKey} onClick={() => playNote('G4')}>8</div>
      <div style={blackKey} onClick={() => playNote('G#4')}>9</div>
      <div style={whiteKey} onClick={() => playNote('A4')}>10</div>
      <div style={blackKey} onClick={() => playNote('A#4')}>11</div>
      <div style={whiteKey} onClick={() => playNote('B4')}>12</div>
      <div style={whiteKey} onClick={() => playNote('C5')}>13</div>
    </div>
    </div>
  
  )
}

export default Piano