import UploadMusic from '../page/UploadMusic.js';

// 작업실 업로드 모달을 위한 페이지입니다.

export default function TestModal() {

    return (
        <div>
            <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button>
            <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <UploadMusic />
            </div>
            </dialog>
        </div>
    );
}
