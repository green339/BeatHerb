import UploadMusic from '../page/UploadMusic.js';
import LoadMusic from '../page/LoadMusic.js';

// 작업실 업로드 모달을 위한 페이지입니다.
// 작업실 불러오기 모달을 위한 페이지입니다.
// 향후 작업 후 삭제할 예정입니다.

export default function TestModal() {

    return (
        <div>
            <button className="btn" onClick={()=>document.getElementById('my_modal_upload').showModal()}>open modal</button>
            <dialog id="my_modal_upload" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <UploadMusic />
            </div>
            </dialog>

            <button className="btn" onClick={()=>document.getElementById('my_modal_load').showModal()}>open modal</button>
            <dialog id="my_modal_load" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <LoadMusic />
            </div>
            </dialog>

        </div>
        
    );
}
