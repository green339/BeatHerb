// 컴포넌트가 제대로 만들어 졌는지 테스트하기 위한 공간

import CardList from "../components/CardList.js";
import Hello from '../components/Hello.js';
import Microphone from "../components/Microphone.js";
import MusicEdit from "../components/MusicEdit.js";
export default function Test() {
  return (
    <>
    <Microphone></Microphone>
      <MusicEdit></MusicEdit>
    </>
  );
}