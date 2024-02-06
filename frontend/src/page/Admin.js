import { useRef, useState } from "react";
import { produce } from "immer";

const initHashtag = [
  {
    id: 1,
    name: "Category 1",
    hashtags: [
      {id: 1, name: "Hashtag 1-1"},
      {id: 2, name: "Hashtag 1-2"},
      {id: 3, name: "Hashtag 1-3"},
      {id: 4, name: "Hashtag 1-4"},
    ]
  },
  {
    id: 2,
    name: "Category 2",
    hashtags: [
      {id: 5, name: "Hashtag 2-1"},
      {id: 6, name: "Hashtag 2-2"},
      {id: 7, name: "Hashtag 2-3"},
      {id: 8, name: "Hashtag 2-4"},
    ]
  },
  {
    id: 3,
    name: "Category 3",
    hashtags: [
      {id: 9, name: "Hashtag 3-1"},
      {id: 10, name: "Hashtag 3-2"},
      {id: 11, name: "Hashtag 3-3"},
      {id: 12, name: "Hashtag 3-4"},
    ]
  },
  {
    id: 4,
    name: "Category 4",
    hashtags: [
      {id: 13, name: "Hashtag 4-1"},
      {id: 14, name: "Hashtag 4-2"},
      {id: 15, name: "Hashtag 4-3"},
      {id: 16, name: "Hashtag 4-4"},
    ]
  },
  {
    id: 5,
    name: "Category 5",
    hashtags: [
      {id: 17, name: "Hashtag 5-1"},
      {id: 18, name: "Hashtag 5-2"},
      {id: 19, name: "Hashtag 5-3"},
      {id: 20, name: "Hashtag 5-4"},
    ]
  },
]

export default function Admin() {
  const deleteModalRef = useRef();
  const addModalRef = useRef();
  const [newId, setNewId] = useState(21);
  const [hashtagList, setHashtagList] = useState(initHashtag);
  const [addModalInput, setAddModalInput] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedHashtagId, setSelectedHashtagId] = useState(null);

  // 해시태그 추가
  // 추후 백엔드랑 연동해야 함
  const addHashtag = () => {
    setHashtagList(
      produce(draft => {
        const category_index = draft.findIndex(category => category.id === selectedCategoryId);
        draft[category_index].hashtags.push({id: newId, name: addModalInput});
      })
    );
    setNewId(newId + 1);
    setAddModalInput("");
    setSelectedCategoryId(null);
  }

  // 해시태그 삭제
  // 추후 백엔드랑 연동해야 함
  const deleteHashtag = () => {
    setHashtagList(
      produce(draft => {
        draft.forEach(category => {
          const hashtag_index = category.hashtags.findIndex(hashtag => hashtag.id === selectedHashtagId)
          if (hashtag_index !== -1) {
            category.hashtags.splice(hashtag_index, 1);
          }
        })
      })
    );
    setSelectedHashtagId(null);
  }

  // 해시태그 추가 버튼을 클릭하면 해시태그 추가 모달이 뜬다
  const handleOnClickAddHashtag = (e) => {
    const buttonId = e.target.id;
    const categoryId = Number(buttonId.slice(8));
    setSelectedCategoryId(categoryId);
    addModalRef.current?.showModal();
  }

  // 해시태크 토큰을 클릭하면 삭제 모달이 뜬다
  const handleOnClickHashtagToken = (e) => {
    const TokenId = e.target.id;
    const categoryId = Number(TokenId.slice(7));
    setSelectedHashtagId(categoryId);
    deleteModalRef.current?.showModal();
  }

  return (
    <>
      <div>
        <p className="text-4xl text-primary text-semibold my-8">관리자 페이지</p>
        <p className="text-2xl text-primary text-semibold mx-4 mb-4 text-left">해시태그 목록</p>
        {
          hashtagList.map((category) => (
            <div className="flex flex-col mx-4 mb-4 gap-4" key={"category" + category.id}>
              <div className="flex gap-8">
                <p className="text-xl text-base-content text-semibold text-left">{category.name}</p>
                <button
                  className="btn btn-sm btn-ghost text-base-content"
                  id={"category" + category.id} onClick={handleOnClickAddHashtag}
                >
                  + 해시태그 추가
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  category.hashtags.map((hashtag) => (
                    <div 
                      key={"hashtag"+hashtag.id} 
                      className="badge badge-lg badge-primary text-primary-content" 
                      id={"hashtag" + hashtag.id}
                      onClick={handleOnClickHashtagToken}
                    >
                      {hashtag.name}
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>

      <dialog className="modal" ref={deleteModalRef}>
        <div className="modal-box bg-base-200">
          <p className="py-4">선택한 해시태그를 지우시겠습니까?</p>
          <div className="modal-action">
            <form method="dialog">
            <button className="btn btn-outline btn-error" onClick={deleteHashtag}>Delete</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog className="modal" ref={addModalRef}>
        <div className="modal-box bg-base-200">
          <p className="py-4">추가할 해시태그를 입력해주세요</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={addModalInput}
            onChange={(e) => setAddModalInput(e.target.value)}
          />
          <div className="modal-action">
            <form method="dialog">
            <button 
              className="btn btn-outline btn-primary"
              onClick={addHashtag}
            >
              Add
            </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}