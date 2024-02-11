// 검색 바
// 상세 검색 구현 필요

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { produce } from "immer";

export default function SearchBar({ initQuery = "", initHashtagListString = "" }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initQuery);
  const [hashtagList, setHashtagList] = useState([]);
  const searchDetailModalRef = useRef();

  const initHashtagNameList = initHashtagListString.split(",");

  useEffect(() => {
    const serverUrl = process.env.REACT_APP_TEST_SERVER_BASE_URL;
    axios({
      method: "get",
      url: `${serverUrl}/content/hashtag`
    })
    .then((response) => {
      console.log(response.data.data);
      const newHashtagList = response.data.data.map((hashtag) => {
        return {
          ...hashtag,
          isSelected: initHashtagNameList.findIndex((hashtagName) => hashtagName === hashtag.name) !== -1
        }
      })
      setHashtagList(newHashtagList);
      console.log(newHashtagList)
    })
    .catch((error) => {
      console.log(error.message);
      alert("오류가 발생했습니다.")
    })

    // 검색 조건에 해당하는 콘텐츠 가져오기
    // 조건이 없으면 전부 들고오기
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // 검색
  const handleSearchClick = () => {
    console.log('검색어는', query);
    let url = "/board/all";
    let hashtagNameListString = ""
    let paramCount = 0;

    hashtagList.forEach(hashtag => { 
      if (hashtag.isSelected) {
        if (hashtagNameListString !== "") hashtagNameListString += ",";
        hashtagNameListString += hashtag.name;
      } 
    })

    if(query !== "") {
      paramCount++;
      url = url + `?query=${query}`;
    }

    if(hashtagNameListString !== "") {
      paramCount++;
      url += (paramCount === 2 ? "&" : "?");
      url = url + `hashtagList=${hashtagNameListString}`;
    }
    
    navigate(url);
  };

  const handleToggleHashtagSelected = (hashtagId) => {
    setHashtagList(
      produce(draft => {
        const targetHashtag = draft.find((hashtag) => hashtag.id === hashtagId);
        targetHashtag.isSelected = !targetHashtag.isSelected
      })
    )
  }

  return (
    <>
      <div className="rounded-lg bg-base-200">
        <div className="w-full p-8">
          <div className="join w-full justify-center">
            <div className="w-full">
              <input 
                className="input input-bordered join-item w-full text-base-content"
                placeholder="Search"
                value={query}
                onChange={handleSearchChange}
              />
            </div>
            <div className="">
              <button className="btn btn-primary disabled:btn-base-100 join-item" onClick={handleSearchClick}>
                <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
                  <path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-x-2 gap-y-2 flex-wrap">
              {
                hashtagList.map(hashtag => {
                  return hashtag.isSelected ? 
                    <div key={hashtag.name} className="badge badge-lg badge-primary text-primary-content">{hashtag.name}</div> : null;
                })
              }
            </div>
            <div
              className="text-base-content w-20 text-nowrap cursor-pointer"
              onClick={() => searchDetailModalRef.current?.showModal()}
            >
              상세 검색
            </div>
          </div>
        </div>
      </div>
      <dialog className="modal" ref={searchDetailModalRef}>
        <div className="modal-box bg-base-200">
          <p className="py-4">검색에 사용할 해시태그</p>
          <div className="flex flex-wrap m-4 gap-4">
            {
              hashtagList.map((hashtag) => (
                <>
                  {
                    hashtag.isSelected ? 
                    <div 
                      key={"hashtag" + hashtag.id} 
                      className="badge badge-lg badge-primary text-primary-content cursor-pointer" 
                      id={"hashtag" + hashtag.id}
                      onClick={() => handleToggleHashtagSelected(hashtag.id)}
                    >
                      {hashtag.name}
                    </div> : null
                  }
                </>
              ))
            }
          </div>
          <p className="py-4">해시태그 목록</p>
          <div className="flex flex-wrap m-4 gap-4">
            {
              hashtagList.map((hashtag) => (
                <>
                  {
                    !hashtag.isSelected ? 
                    <div 
                      key={"hashtag" + hashtag.id} 
                      className="badge badge-lg badge-primary text-primary-content cursor-pointer" 
                      id={"hashtag" + hashtag.id}
                      onClick={() => handleToggleHashtagSelected(hashtag.id)}
                    >
                      {hashtag.name}
                    </div> : null
                  }
                </>
              ))
            }
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}