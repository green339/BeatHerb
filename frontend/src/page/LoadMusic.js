import { useState, useRef } from "react";
// import { loadMusic } from "../api/upload.js";
import axios from "axios";
export default function LoadMusic({ getLoadMusic }) {
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const fileInput = useRef(null);
  const [query, setQuery] = useState("");
  const [roots, setRoots] = useState([]);
  const [titles, setTitles] = useState(["a", "b", "c"]);
  const [searchData, setSearchData] = useState({
    vocalList: [],
    melodyList: [],
    soundTrackList: [],
  });
  const [isSearch, setIsSearch] = useState(false);

  const handleFileUpload = async (event) => {
    //여러 파일업로드
    setFiles((files) => [...files, ...Array.from(event.target.files)]);
    console.log(files);
  };

  const loadMusic = () => {
    getLoadMusic([...files, ...urls], roots);// 루트도 같이 보내주기
    clearMusic()
  };
  const clearMusic = () => {
    setFiles([]);
    setUrls([]);
    setRoots([]);
    setQuery("")
    setTitles([]);
  };
  const changeInputValue = (event) => {
    setQuery(event.target.value);
    console.log(event.target.value);
  };
  const searchBtnClick = async () => {
    console.log("search");
    setIsSearch(true);
    axios({
      url: "https://node5.wookoo.shop/api/content/search?title=" + query,
      method: "GET",
    })
      .then((response) => {
        console.log("response.data", response.data.data);
        setSearchData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const clickMusicBtn = async (id, title) => {
    await beatherbMusic(id, title);
  };
  const beatherbMusic = async (id, title) => {
    axios({
      url: "http://localhost:8080/api/content/load/" + title,
      method: "GET",
      responseType: "arraybuffer",
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: "audio/mp3" }); // Blob 객체 생성
        let file = new File([blob], title + ".mp3", {
          type: "audio/mp3",
          lastModified: new Date(),
        });
        let url = URL.createObjectURL(file);
        // const url = window.URL.createObjectURL(blob);
        setUrls((urls) => [...urls, url]);
        setTitles((titles) => [...titles, title]);
        setRoots((root) => [...roots, id]);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(urls);
  };
  const types = [
    { value: "melodyList", title: "멜로디" },
    { value: "vocalList", title: "보컬" },
    { value: "soundTrackList", title: "음원" },
  ];

  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="text-base-content pt-5 pb-50 w-full">
          <div className="text-4xl pb-10">음원 불러오기</div>
          <div className="flex w-full pb-10 mx-6">
            <div className="w-3/4 text-left">
              <input
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                accept="audio/mp3"
                ref={fileInput}
                multiple="multiple"
              />
              <button
                className="btn btn-primary btn-s"
                onClick={() => {
                  fileInput.current.click();
                }}
              >
                +첨부하기
              </button>
            </div>
            <div
              className="w-1/4 text-right"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {files.map((value, index) => (
                <span key={index}>{value.name} </span> // 배열의 각 항목을 화면에 표시
              ))}
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-3/4 text-left whitespace-nowrap pb-2 pr-10 mx-6">
              BeatHerb에서 가져오기
            </div>
            <div
              className="w-1/4 text-right"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {titles.map((value, index) => (
                <span key={index}>{value} </span> // 배열의 각 항목을 화면에 표시
              ))}
            </div>
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="찾을 음원 제목을 입력해주세요."
              className="input input-ghost w-full mx-3"
              value={query}
              onChange={changeInputValue}
            />
            <button onClick={searchBtnClick} className="btn btn-primary btn-m">
              검색
            </button>
          </div>
          {isSearch ? (
            <div className="px-10 grid grid-cols-3 pt-10 gap-4">
              {types.map((type) => (
                <div
                  style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}
                  key={type.value}
                >
                  <p>{type.title}</p>
                  <div className="max-h-48" style={{ overflow: "scroll", overflowX: "hidden" }}>
                    {searchData[type.value].map((value, index) => (
                      <div
                        className="w-full flex bg-neutral-700 p-2 rounded-xl"
                        key={value.id}
                        onClick={() => clickMusicBtn(value.id, value.title)}
                      >
                        <p
                          className="text-base-content m-1 w-2/3"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            justifyItems: "start",
                            textAlign: "start",
                          }}
                        >
                          {value.title}
                        </p>
                        <p
                          className="text-base-content m-1 w-1/3"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {value.creatorList.map((value, index) => (
                            <span key={index}>{value.nickname} </span> // 배열의 각 항목을 화면에 표시
                          ))}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}

          <div className="flex justify-center">
            <div className="self-auto text-xl flex">
              <div className="modal-action px-3">
                <form method="dialog">
                  <button className="btn" onClick={loadMusic}>
                    확인
                  </button>
                </form>
              </div>
              <div className="modal-action px-3">
                <form method="dialog">
                  <button className="btn" onClick={clearMusic}>
                    취소
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
