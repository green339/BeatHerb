import LoadMusic from "../page/LoadMusic.js";
import ShortsModal from "../page/ShortsModal.js";
import React, { useRef } from "react";
// 작업실 업로드 모달을 위한 페이지입니다.
// 작업실 불러오기 모달을 위한 페이지입니다.
// 향후 작업 후 삭제할 예정입니다.

export default function TestModal() {
  const loadMusicModalRef = useRef(null);
  const shortsModalRef = useRef(null);
  const openLoadMusicModal = () => {
    loadMusicModalRef.current.showModal();
  };
  const openShortsModal = () => {
    shortsModalRef.current.showModal();
  };
  const getModalClearState = () => { //닫는다고 알려주는 그리고 여기서 닫아
    shortsModalRef.current.close();
  };
  return (
    <div>
      <button onClick={openLoadMusicModal}>open modal</button>
      <dialog ref={loadMusicModalRef}>
        <div className="modal-box w-11/12 max-w-5xl">
          <LoadMusic />
        </div>
      </dialog>

      <button onClick={openShortsModal}>open modal</button>
      <dialog ref={shortsModalRef} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <ShortsModal initState={true} getModalClearState={getModalClearState} />
        </div>
      </dialog>
    </div>
  );
}
