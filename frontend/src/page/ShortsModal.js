import React, { useRef,useState } from "react";
import UploadShorts from "../page/UploadShorts.js";
import Shorts from "../components/Shorts.js";

export default function ShortsModal({ initState,getModalCloseState }) {
  console.log(initState)
  const [modalState, setModalState] = useState(initState);
  const [downloadData, setDownloadData] = useState(null);
  const [musicRoot, setMusicRoot] = useState("");
  const getChildShorts = (url, root) => {
    setDownloadData(url);
    setModalState(false);
    setMusicRoot(root); //사용한 음악
  };
  const getClearState = () => {
    clear()
  };
  const clear = () => {
    setModalState(true);
    setDownloadData(null);
    setMusicRoot("");
    getModalCloseState()
  }

  return (
    <div className="w-full h-full">
      <div className="text-4xl pb-10">쇼츠 올리기</div>
      {modalState ? (
        <Shorts getChildShorts={getChildShorts} getClearState={getClearState}></Shorts>
      ) : (
        <div>
          <button className="text-right btn-s btn" onClick={() => setModalState(true)}>다시 만들기</button>
          <UploadShorts shorts={downloadData} getClearState={getClearState} />
        </div>
      )}
    </div>
  );
}
