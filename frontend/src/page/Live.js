//라이브 페이지
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import { useStateCallback } from "../hook/useStateCallback";

function OpenViduVideoComponent(props) {
  const videoRef = useRef();

  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [])

  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  })

  return <video autoPlay={true} ref={videoRef} />;
}

function UserVideoComponent(props) {
  function getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  }

  return (
    <div>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div><p>{getNicknameTag()}</p></div>
        </div>
      ) : null}
    </div>
  );
}

export default function Live() {
  //몇 명의 호스트가 라이브에 참여하는가
  //ex) 대표 호스트 한명, 서브 호스트 두명
  const [hostNum, setHostNum] = useState(3);

  const location = useLocation();
  const token = location.state?.token || undefined;
  const role = location.state?.role || undefined;

  const navigate = useNavigate();

  // OpenVidu 관련 상태 값
  const ov = useRef(null); 
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  const [session, setSessionCallback] = useStateCallback();
  const [mainStreamManager, setMainStreamManager] = useState();  // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState();

  const componentDidMount = () => {
    window.addEventListener('beforeunload', onbeforeunload);
  }

  const componentWillUnmount = () => {
    window.removeEventListener('beforeunload', onbeforeunload);
  }

  const onbeforeunload = (event) => {
    leaveSession();
  }

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  }

  const handleChangeUserName = (e) => {
    setMyUserName(e.target.value);
  }

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  }

  const deleteSubscriber = (streamManager) => {
    let newSubscribers = [...subscribers];
    let index = newSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      newSubscribers.splice(index, 1);
      setSubscribers(newSubscribers);
    }
  }

  const leaveSession = () => {
    session.disconnect();

    // 모든 상태 값 해제
    ov.current = null;
    setSessionCallback(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);

    // 다른 페이지로 이동
    navigate("/board/live");
  }

  const joinSession = () => {
    console.log(token, role);

    const openVidu = new OpenVidu(); // OpenVidu 객체 생성
    ov.current = openVidu;

    const initSession = ov.current.initSession();
    
    // 세션 초기화 및 연결
    setSessionCallback(initSession, (s) => {
      const mySession = s;

      // On every new Stream received...
      mySession.on('streamCreated', (event) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        var subscriber = mySession.subscribe(event.stream, undefined);
        let newSubscribers = [...subscribers];
        newSubscribers.push(subscriber);
        setSubscribers(newSubscribers);
      });

      // On every Stream destroyed...
      mySession.on('streamDestroyed', (event) => {
        // Remove the stream from 'subscribers' array
        deleteSubscriber(event.stream.streamManager);
      });

      // On every asynchronous exception...
      mySession.on('exception', (exception) => {
        console.warn(exception);
      });

      // 세션에 연결
      mySession.connect(token, { clientData: myUserName })
        .then(async () => {
          // 세션에 연결하는 클라이언트의 역할이 Publisher이면 if문 안의 작업을 수행
          if (role === "PUBLISHER") {
            // 퍼블리셔 생성
            let publisher = await ov.current.initPublisherAsync(undefined, {
              audioSource: undefined, // 오디오 소스
              videoSource: undefined, // 비디오 소스
              publishAudio: true, // 오디오 퍼블리시 여부
              publishVideo: true, // 비디오 퍼블리시 여부
              resolution: '640x480', // 비디오 해상도
              frameRate: 30, // 비디오 주사율
              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
              mirror: false, // 당사자 로컬 비디오의 거울 반전 여부
            });

            // 생성된 퍼블리셔를 퍼블리싱
            mySession.publish(publisher);

            // 현재 사용중인 비디오 장치를 획득
            var devices = await ov.current.getDevices();
            var videoDevices = devices.filter(device => device.kind === 'videoinput');
            var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
            var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

            // Set the main video in the page to display our webcam and store our Publisher
            setCurrentVideoDevice(currentVideoDevice);
            setMainStreamManager(publisher);
            setPublisher(publisher);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
          navigate("/board/live"); 
        });
      });
  }

  useEffect(() => {
    joinSession();
  }, []);

  return (
    <div className="container w-full h-full">
      {session === undefined ? (
        <div id="join">
          <div id="img-div">
            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            {/* <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            /> */}
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(publisher)}>
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
  // return (
  //   <div className="grid grid-cols-10">
  //     <div className="col-span-7">
  //       <div className="mt-6 mb-4 flex justify-center items-center">
  //         <div style={{position: 'relative'}}>
  //           <img src="https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2150394443.jpg?w=1060&t=st=1706683154~exp=1706683754~hmac=3ea592dfa518b96373d1613b8dde42a208dd565b677cd813f2d6f021e1991531" alt="live" width="700" height="400"/>
  //           <div style={{position: 'absolute', top: '20px', left: '20px'}}>
  //             <svg xmlns="http://www.w3.org/2000/svg" width="150" height="53" fill="none"><rect width="150" height="52.5" fill="red" rx="26.25"/><path fill="#fff" d="M74.864 35V17.546h2.113v15.579h8.114V35H74.864Zm15.613-17.454V35h-2.113V17.546h2.113Zm4.954 0 5.182 14.693h.204l5.182-14.693h2.216L101.806 35h-2.182l-6.409-17.454h2.216ZM110.934 35V17.546h10.534v1.875h-8.42v5.897h7.875v1.875h-7.875v5.932h8.556V35h-10.67Z"/><path fill="#fff" d="M36.75 35.719c2.438 0 4.5-.844 6.188-2.532 1.687-1.687 2.53-3.75 2.53-6.187 0-2.438-.843-4.5-2.53-6.188-1.688-1.687-3.75-2.53-6.188-2.53-2.438 0-4.5.843-6.188 2.53-1.687 1.688-2.53 3.75-2.53 6.188 0 2.438.843 4.5 2.53 6.188 1.688 1.687 3.75 2.53 6.188 2.53Zm0 10.031c-2.563 0-4.984-.492-7.266-1.477-2.28-.984-4.273-2.328-5.976-4.03-1.703-1.704-3.047-3.696-4.031-5.977C18.492 31.984 18 29.563 18 27c0-2.594.492-5.031 1.477-7.313.984-2.28 2.328-4.265 4.03-5.953 1.704-1.687 3.696-3.023 5.977-4.007 2.282-.985 4.703-1.477 7.266-1.477 2.594 0 5.031.492 7.313 1.477 2.28.984 4.265 2.32 5.953 4.007 1.687 1.688 3.023 3.672 4.007 5.954.985 2.28 1.477 4.718 1.477 7.312 0 2.563-.492 4.984-1.477 7.266-.984 2.28-2.32 4.273-4.007 5.976-1.688 1.703-3.672 3.047-5.953 4.031-2.282.985-4.72 1.477-7.313 1.477Zm0-2.813c4.438 0 8.203-1.554 11.297-4.664 3.094-3.109 4.64-6.867 4.64-11.273 0-4.438-1.546-8.203-4.64-11.297-3.094-3.094-6.86-4.64-11.297-4.64-4.406 0-8.164 1.546-11.273 4.64-3.11 3.094-4.665 6.86-4.665 11.297 0 4.406 1.555 8.164 4.665 11.273 3.109 3.11 6.867 4.664 11.273 4.664Z"/></svg>
  //           </div>
  //           <div style={{position: 'absolute', width: '80px', height: '30px', backgroundColor: 'white', left: '0', bottom: '0'}}>
  //             <p style={{fontSize: '20px'}}>호스트1</p>
  //           </div>
  //         </div>
  //       </div>
  //       {
  //         Array(hostNum-1).fill().map((v, index) => {
  //           return (
  //             <div key={index} className="inline-block mr-4" style={{position: 'relative'}}>
  //               <img src="https://img.freepik.com/free-psd/live-streaming-3d-render-icon_47987-9046.jpg?w=900&t=st=1706676747~exp=1706677347~hmac=95d8db0ac477ba72d79177fd6767d0ac55f92c56a131381c4b983363d998ab33" alt="live" width="200" height="200"/>
  //               <div style={{position: 'absolute', width: '80px', height: '30px', backgroundColor: 'white', left: '0', bottom: '0'}}>
  //                 <p style={{fontSize: '20px'}}>호스트{index+2}</p>
  //               </div>
  //             </div>
  //           )
  //         })
  //       }
  //       <div style={{ paddingLeft: '180px' }}>
  //         <p className="text-white font-bold text-2xl text-left">Google이 심심해서 하는 라이브</p>
  //         <p className="text-white text-left">@구글 자작곡, @구글 자작 곡곡, @애국가</p>
  //       </div>
  //     </div>
  //     <div className="col-span-3 flex justify-center items-center">
  //       <div style={{ width: '400px', height: '680px', backgroundColor: 'white', position: 'relative'}} className="items-start">
  //         <div style={{ width: '250px', height: '80px', position: 'absolute', right: '120px', bottom: '30px'}} className="bg-gray-200"/>
  //         <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" style={{ position: 'absolute', right: '40px', bottom: '50px'}}>
  //           <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
  //         </svg>
  //       </div>
  //     </div>
  //   </div>
  // );
}