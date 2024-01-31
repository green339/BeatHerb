// 컴포넌트가 제대로 만들어 졌는지 테스트하기 위한 공간

import { useRef } from 'react';
import Dm from '../components/Dm.js';

export default function Test() {
  const ref = useRef();

  return (
    <>
      <button className="btn" onClick={()=>ref.current?.showModal()}>open modal</button>
      <dialog className="modal" ref={ref}>
        <div className="modal-box w-11/12 max-w-5xl bg-base-200">
          <Dm />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}