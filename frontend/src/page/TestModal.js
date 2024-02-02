import UploadMusic from '../page/UploadMusic.js';

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
