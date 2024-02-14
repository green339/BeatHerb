import UploadMusic from "../page/UploadMusic.js";
import ShortsPlay from "../page/ShortsPlay.js";
import React, { useRef, useEffect } from 'react';

// 작업실 업로드 모달을 위한 페이지입니다.
// 작업실 불러오기 모달을 위한 페이지입니다.
// 향후 작업 후 삭제할 예정입니다.

export default function TestModal() {
    const shortsPlayModalRef = useRef(null);
    const shortsPlayRef = useRef(null);
  const openShortsPlayModal = () => {
    shortsPlayModalRef.current.showModal();
  };
    const closeShortsPlayModal = () => {
        shortsPlayRef.current.clear()
    shortsPlayModalRef.current.close();
  };
  useEffect(() => {
    const handleBackdropClick = (e) => {
      if (e.target === shortsPlayModalRef.current) {
        closeShortsPlayModal();
      }
    };
    window.addEventListener('click', handleBackdropClick);

    return () => {
      window.removeEventListener('click', handleBackdropClick);
    };
  }, []);

  return (
    <div>
      <button onClick={openShortsPlayModal}>open modal</button>
      <dialog ref={shortsPlayModalRef} className="modal">
        <div className="modal-box w-7/12 max-w-5xl" onClick={e => e.stopPropagation()} >
          <ShortsPlay ref={(el) => (shortsPlayModalRef.current = el)}  />
        </div>
      </dialog>
    </div>
  );
}
