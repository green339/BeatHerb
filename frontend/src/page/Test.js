// 컴포넌트가 제대로 만들어 졌는지 테스트하기 위한 공간

import ChatYou from '../components/ChatYou'
import ChatMe from '../components/ChatMe'
import ContentsItem from '../components/ContentsItem.js';
import LiveItem from '../components/LiveItem.js';
import NavBar from '../components/NavBar.js';
import ShortsItem from '../components/ShortsItem.js';
import Board from './Board.js';

export default function Test() {
  return (
    <>
      <ChatMe />
      <ChatYou />
      <NavBar />
      <Board>
        <p className="text-base-content">Page Content</p>
      </Board>
      <ContentsItem size={150} />
      <ContentsItem size={200} />
      <ContentsItem size={230} />
      <ShortsItem />
      <LiveItem />
    </>
  );
}