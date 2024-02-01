import './MusicPlayer.css';
const music = {
  "title": "음악 제목입니다",
  "creator": "창작가입니다",
  "src_link": "소스링크",
  "isPlaying": false,
  "current": 0
}
const pause= (e) => {
  
};
const play= (e) => {
  
};
const prev = () => {
  
}
const next = () => {
  
}
const updateProgress = () => {
  
}
setTimeout(function () {
  var audio = document.getElementById('audio');
  console.log(audio);
  console.log("audio", audio.duration);
}, 100);

export default function MusicPlayer() {
  return (
    <div className="grid grid-cols-6">
      <audio id="audio" src="https://p.scdn.co/mp3-preview/0ba9d38f5d1ad30f0e31fc8ee80c1bebf0345a0c" controls>
      </audio>
      <div className="">
        <div>{music.title}</div>
        <div>{ music.creator}</div>
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-6">
          <div className="col-start-2">
            이전
          </div>
          <div className="col-span-2">
            재생/일시정지
          </div>
          <div>
            이후
          </div>
        </div>
        <div>음악 진행 표시바</div>
      </div>
      <div>
        <div>음량버튼</div>
      </div>
    </div>

  )
}

