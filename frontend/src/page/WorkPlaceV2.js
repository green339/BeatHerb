import Record from "../components/Record";
import Piano from "../components/Piano";
import MusicWave from "../components/MusicWave";
import { useState, useRef } from "react"
import { useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function WorkPlace() {
  const location = useLocation();
  const childMusicWaveRef = useRef(null);
  const getRecordResult = (url) => {
    // setRecordResult(url)
    console.log(url)
    console.log("childMusic",childMusicWaveRef.current)
    childMusicWaveRef.current.handleRecordingUpload(url)
  }
  const tabs = [
    { value: "record", title: "녹음",img:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
  </svg>
   },
    { value: "piano", title: "피아노" },
    { value: "synth", title: "신스" },
  ]
  const [instrument, setInstrument] = useState("record");
  let content;
  switch (instrument) {
    case "record":
      content = <Record getRecordResult={getRecordResult} />; break
    case "piano":
      content = <Piano getRecordResult={getRecordResult} />; break
    case "synth":
      content = <div>synth</div>; break
  }

  return (
    <div>
      <p className="text-primary text-3xl font-semibold">작업실 화면이에요~~~~~~~~</p>
      <div className="h-screen">
        <div className="flex w-full h-4/6">
          <MusicWave ref={(el) => (childMusicWaveRef.current = el)}></MusicWave>
        </div>
        <div className="flex w-full h-2/6">
          <div className="w-1/12 bg-base-200 border-r-2 border-gray-300">
            <div className="grid grid-cols-1">
            {
          tabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              onClick={() => setInstrument(tab.value)}
            >
              {tab.title}
              {tab.img}
            </button>
          ))
        }
            </div>
          </div>
          <div className="w-11/12 bg-base-200">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
