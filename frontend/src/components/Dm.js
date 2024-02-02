//Dm 컴포넌트
import {useState} from "react";

export default function Dm(){
  const [personNum, setPersonNum] = useState(5);

  return (
    <div>
      <div className="flex mx-1.5 justify-center items-center">
        <p className="text-5xl text-white">DM</p>
      </div>
      {
        Array(personNum).fill().map((v, index) => {
          return (
            <div key={index} className="flex pt-6 items-center justify-evenly">
              <div className="inline-block">
                <img src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1706664646~exp=1706665246~hmac=3f0eac27cb02e203eb35c307d60daf8dd9edced316e689b461b9a8a67fb9b31b" width="70" height="70" className="inline-block mr-2" alt=""/>
                <div className="inline-block">
                  <p className="text-white text-left mb-2">user{index+1}</p>
                  <p className="text-primary text-left mb-2">dm message</p>
                </div>
              </div>
              <div className="inline-block">
                <svg width="100" height="100">
                  <circle cx="50" cy="50" r="10" fill="red" />
                  <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">
                    10
                  </text>
                </svg>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}
