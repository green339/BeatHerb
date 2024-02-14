import * as Tone from "tone";
import React, { useEffect, useState } from "react";

const Synth = ({ getRecordResult }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [playSynth, setPlaySynth] = useState(null);
  const [result, setResult] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    Tone.loaded().then(() => {
      console.log("Audio is loaded");
      const newRecorder = new Tone.Recorder();
      setRecorder(newRecorder);

      const newPlaySynth = new Tone.Synth({
        urls: {
          C4: "C4.mp3",
          "D#4": "Ds4.mp3",
          "F#4": "Fs4.mp3",
          A4: "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
      })
        .toDestination()
        .connect(newRecorder);
      setPlaySynth(newPlaySynth);
    });
  }, []);

  const playNote = (note) => {
    playSynth.triggerAttackRelease(note, 4);
  };

  const startRecording = async () => {
    await recorder.start();
    setIsRecording(true);
    setAudio(null);
  };

  const stopRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      const recording = await recorder.stop();
      setResult(recording);
      setAudio(new Audio(URL.createObjectURL(recording)));
      // const url = URL.createObjectURL(recording);//blob객체
      // const audio = new Audio(url)
    }
  };

  const playRecording = () => {
    // const url = URL.createObjectURL(result);//blob객체
    // const audio = new Audio(url)
    setIsPlaying(true);
    audio.play();
  };
  const stopPlaying = () => {
    setIsPlaying(false);
    audio.pause();
  };

  const uploadRecording = () => {
    const url = URL.createObjectURL(result); //blob객체
    getRecordResult(url);
    setAudio(null);
    console.log("upload");
  };

  const whiteKey = {
    border: "1px solid #000000",
    width: "50px",
    height: "180px",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius:"10px"
  };
  const blackKey = {
    border: "1px solid #000000",
    width: "50px",
    height: "100px",
    marginLeft: "-25px",
    marginRight: "-25px",
    backgroundColor: "#000000",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius:"10px"
  };

  return (
    <div>
      <div className="flex p-5" style={{ justifyContent: "center" }}>
        
        <div style={whiteKey} onClick={() => playNote("C3")}>
            1
          </div>
          <div style={blackKey} onClick={() => playNote("C#3")}>
            2
          </div>
          <div style={whiteKey} onClick={() => playNote("D3")}>
            3
          </div>
          <div style={blackKey} onClick={() => playNote("D#3")}>
            4
          </div>
          <div style={whiteKey} onClick={() => playNote("E3")}>
            5
          </div>
          <div style={whiteKey} onClick={() => playNote("F3")}>
            6
          </div>
          <div style={blackKey} onClick={() => playNote("F#3")}>
            7
          </div>
          <div style={whiteKey} onClick={() => playNote("G3")}>
            8
          </div>
          <div style={blackKey} onClick={() => playNote("G#3")}>
            9
          </div>
          <div style={whiteKey} onClick={() => playNote("A3")}>
            10
          </div>
          <div style={blackKey} onClick={() => playNote("A#3")}>
            11
          </div>
          <div style={whiteKey} onClick={() => playNote("B3")}>
            12
          </div>
          <div style={whiteKey} onClick={() => playNote("C4")}>
            1
          </div>
          <div style={blackKey} onClick={() => playNote("C#4")}>
            2
          </div>
          <div style={whiteKey} onClick={() => playNote("D4")}>
            3
          </div>
          <div style={blackKey} onClick={() => playNote("D#4")}>
            4
          </div>
          <div style={whiteKey} onClick={() => playNote("E4")}>
            5
          </div>
          <div style={whiteKey} onClick={() => playNote("F4")}>
            6
          </div>
          <div style={blackKey} onClick={() => playNote("F#4")}>
            7
          </div>
          <div style={whiteKey} onClick={() => playNote("G4")}>
            8
          </div>
          <div style={blackKey} onClick={() => playNote("G#4")}>
            9
          </div>
          <div style={whiteKey} onClick={() => playNote("A4")}>
            10
          </div>
          <div style={blackKey} onClick={() => playNote("A#4")}>
            11
          </div>
          <div style={whiteKey} onClick={() => playNote("B4")}>
            12
          </div>
          <div style={whiteKey} onClick={() => playNote("C5")}>
            13
          </div>
          <div style={blackKey} onClick={() => playNote("C#5")}>
            2
          </div>
          <div style={whiteKey} onClick={() => playNote("D5")}>
            3
          </div>
          <div style={blackKey} onClick={() => playNote("D#5")}>
            4
          </div>
          <div style={whiteKey} onClick={() => playNote("E5")}>
            5
          </div>
          <div style={whiteKey} onClick={() => playNote("F5")}>
            6
          </div>
          <div style={blackKey} onClick={() => playNote("F#5")}>
            7
          </div>
          <div style={whiteKey} onClick={() => playNote("G5")}>
            8
          </div>
          <div style={blackKey} onClick={() => playNote("G#5")}>
            9
          </div>
          <div style={whiteKey} onClick={() => playNote("A5")}>
            10
          </div>
          <div style={blackKey} onClick={() => playNote("A#5")}>
            11
          </div>
          <div style={whiteKey} onClick={() => playNote("B5")}>
            12
          </div>
          <div style={whiteKey} onClick={() => playNote("C6")}>
            13
          </div>
        </div>
      <div className="flex" style={{ justifyContent: "center", alignItems: "center" }}>

      {isRecording ? (
          <button className="btn btn-primary" onClick={stopRecording}>녹음멈추기</button>
      ) : (
        <button className="btn btn-primary" onClick={startRecording}>녹음하기</button>
      )}
      {audio ? (
        isPlaying ? (
          <div>
            <button className="btn btn-primary" onClick={uploadRecording}>작업실로 올리기</button>
            <button className="btn btn-primary" onClick={stopPlaying}>플레이 멈추기</button>
          </div>
        ) : (
          <div>
            <button className="btn btn-primary" onClick={uploadRecording}>작업실로 올리기</button>
            <button className="btn btn-primary" onClick={playRecording}>플레이하기</button>
          </div>
        )
      ) : (
        <div></div>
      )}
      </div>
    </div>
  );
};

export default Synth;
