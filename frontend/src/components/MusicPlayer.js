import { useRef } from "react";
import { useState } from 'react';
export default function MusicPlayer() {
  const [music,setMusic] = useState({
    "title": "Title",
    "creator": "Artist",
    "src_link": "https://p.scdn.co/mp3-preview/0ba9d38f5d1ad30f0e31fc8ee80c1bebf0345a0c",
    "current": 0
  })
  const audio =useRef()
  const [play, setPlay] = useState(false);
  const nextMusic= {
    "title": "음악 제목입니다",
    "creator": "창작가입니다",
    "src_link": "https://p.scdn.co/mp3-preview/0ba9d38f5d1ad30f0e31fc8ee80c1bebf0345a0c",
    "current": 0
  }
  const prev = () => {
    console.log("이전 곡으로 이동")
  }
  const next = () => {
    console.log("다음 곡으로 이동")
  }
  const updateProgress = () => {
    
  }

  const musicPlay = () => {
    setPlay((prev)=>!prev)
  }
  const musicPause = () => {
    setPlay((prev)=>!prev)
  }
  return (
    <div className="bg-white rounded-t-xl text-black pt-6 fixed bottom-0 w-full">
      <div className="grid grid-cols-9">
        <div>
          사진
        </div>
        <div className="col-span-2">
          <div className="flex justify-start">
            <span className="px-4">{music.title}</span>
            <span>{ music.creator}</span>
          </div>
          <div>
            <progress className=" flex justify-start progress progress-primary w-56" value="20" max="100"></progress>
          </div>
          <div className="flex justify-between text-sm leading-6">
            <div className="text-black">1:75</div>
            <div className="text-slate-500">3:20</div>
          </div>
        </div>
        <div>음량</div>
        <div className="flex">
            <div>
              <button onClick={prev}>이전</button>
            </div>
            <div>
            <button type="button" className="bg-white text-slate-900 flex-none -my-10 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center">
              재생/일시정지
            {/* <svg width="30" height="32" fill="currentColor">
                <rect x="6" y="4" width="4" height="24" rx="2" />
                <rect x="20" y="4" width="4" height="24" rx="2" />
            </svg> */}
            {/* <svg width="30" height="32" fill="none" stroke="currentColor" stroke-width="4">
                <polygon points="15,2 30,30 0,30 15,2" transform="rotate(90 15 16)" />
            </svg> */}
            </button>
            </div>
            <div>
              이후
            </div>
        </div>
      </div>
    </div>
    

  )
}

