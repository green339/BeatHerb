//라이브 페이지
import {useState} from "react";

export default function Live(){
    //몇 명의 호스트가 라이브에 참여하는가
    //ex) 대표 호스트 한명, 서브 호스트 두명
    const[hostNum, setHostNum] = useState(3);

    return (
        <div className="grid grid-cols-10">
            <div className="col-span-7">
                <div className="mt-6 mb-4 flex justify-center items-center">
                    <div style={{position: 'relative'}}>
                        <img src="https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2150394443.jpg?w=1060&t=st=1706683154~exp=1706683754~hmac=3ea592dfa518b96373d1613b8dde42a208dd565b677cd813f2d6f021e1991531" alt="live" width="700" height="400"/>
                        <div style={{position: 'absolute', top: '20px', left: '20px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="53" fill="none"><rect width="150" height="52.5" fill="red" rx="26.25"/><path fill="#fff" d="M74.864 35V17.546h2.113v15.579h8.114V35H74.864Zm15.613-17.454V35h-2.113V17.546h2.113Zm4.954 0 5.182 14.693h.204l5.182-14.693h2.216L101.806 35h-2.182l-6.409-17.454h2.216ZM110.934 35V17.546h10.534v1.875h-8.42v5.897h7.875v1.875h-7.875v5.932h8.556V35h-10.67Z"/><path fill="#fff" d="M36.75 35.719c2.438 0 4.5-.844 6.188-2.532 1.687-1.687 2.53-3.75 2.53-6.187 0-2.438-.843-4.5-2.53-6.188-1.688-1.687-3.75-2.53-6.188-2.53-2.438 0-4.5.843-6.188 2.53-1.687 1.688-2.53 3.75-2.53 6.188 0 2.438.843 4.5 2.53 6.188 1.688 1.687 3.75 2.53 6.188 2.53Zm0 10.031c-2.563 0-4.984-.492-7.266-1.477-2.28-.984-4.273-2.328-5.976-4.03-1.703-1.704-3.047-3.696-4.031-5.977C18.492 31.984 18 29.563 18 27c0-2.594.492-5.031 1.477-7.313.984-2.28 2.328-4.265 4.03-5.953 1.704-1.687 3.696-3.023 5.977-4.007 2.282-.985 4.703-1.477 7.266-1.477 2.594 0 5.031.492 7.313 1.477 2.28.984 4.265 2.32 5.953 4.007 1.687 1.688 3.023 3.672 4.007 5.954.985 2.28 1.477 4.718 1.477 7.312 0 2.563-.492 4.984-1.477 7.266-.984 2.28-2.32 4.273-4.007 5.976-1.688 1.703-3.672 3.047-5.953 4.031-2.282.985-4.72 1.477-7.313 1.477Zm0-2.813c4.438 0 8.203-1.554 11.297-4.664 3.094-3.109 4.64-6.867 4.64-11.273 0-4.438-1.546-8.203-4.64-11.297-3.094-3.094-6.86-4.64-11.297-4.64-4.406 0-8.164 1.546-11.273 4.64-3.11 3.094-4.665 6.86-4.665 11.297 0 4.406 1.555 8.164 4.665 11.273 3.109 3.11 6.867 4.664 11.273 4.664Z"/></svg>
                        </div>
                        <div style={{position: 'absolute', width: '80px', height: '30px', backgroundColor: 'white', left: '0', bottom: '0'}}>
                            <p style={{fontSize: '20px'}}>호스트1</p>
                        </div>
                    </div>
                </div>
                {
                    Array(hostNum-1).fill().map((v, index) => {
                        return (
                        <div key={index} className="inline-block mr-4" style={{position: 'relative'}}>
                            <img src="https://img.freepik.com/free-psd/live-streaming-3d-render-icon_47987-9046.jpg?w=900&t=st=1706676747~exp=1706677347~hmac=95d8db0ac477ba72d79177fd6767d0ac55f92c56a131381c4b983363d998ab33" alt="live" width="200" height="200"/>
                            <div style={{position: 'absolute', width: '80px', height: '30px', backgroundColor: 'white', left: '0', bottom: '0'}}>
                                <p style={{fontSize: '20px'}}>호스트{index+2}</p>
                            </div>
                        </div>
                        )
                    })
                }
                <div style={{ paddingLeft: '180px' }}>
                    <p className="text-white font-bold text-2xl text-left">Google이 심심해서 하는 라이브</p>
                    <p className="text-white text-left">@구글 자작곡, @구글 자작 곡곡, @애국가</p>
                </div>
            </div>
            <div className="col-span-3 flex justify-center items-center">
                <div style={{ width: '400px', height: '680px', backgroundColor: 'white', position: 'relative'}} className="items-start">

                    <div style={{ width: '250px', height: '80px', position: 'absolute', right: '120px', bottom: '30px'}} className="bg-gray-200"/>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" style={{ position: 'absolute', right: '40px', bottom: '50px'}}>
                        <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}