import Piano from "../components/Piano";
import Record from "../components/Record";
import MusicEdit from "../components/MusicEdit";
import {useState,useRef} from "react"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function WorkPlace() {
  // const [showRecord, setShowRecord] = useState(false);
  // const [recordedUrl, setRecordedUrl] = useState(null);

  // const [recordResult, setRecordResult] = useState(null)
  const childMusicEditRef = useRef(null);
  const getRecordResult = (url) => {
    // setRecordResult(url)
    console.log(url)
    console.log(childMusicEditRef.current)
    childMusicEditRef.current.handleRecordingUpload(url)
  }

  return (
    <div>
      <p className="text-primary text-3xl font-semibold">작업실 화면이에요~~~~~~~~</p>
      <div className="h-screen">
        <div className="flex w-full h-4/6">
          <div className="w-4/12 bg-base-200 border-r-2 border-b-2 border-gray-300">1</div>
          <div className="w-8/12 bg-base-200 border-b-2 border-gray-300">
            <DndProvider backend={HTML5Backend}>
              <div className="h-full" style={{ overflow: "scroll", overflowY: "hidden" }}>
                <MusicEdit ref={(el) => (childMusicEditRef.current = el)}></MusicEdit>
              </div>
            </DndProvider>
          </div>
        </div>
        <div className="flex w-full h-2/6">
          <div className="w-4/12 bg-base-200 border-r-2 border-gray-300">
          <Record getRecordResult={getRecordResult} />
          </div>
          <div className="w-8/12 bg-base-200">
            <Piano getRecordResult={getRecordResult}></Piano>
          </div>
        </div>
      </div>
    </div>
  );
}
