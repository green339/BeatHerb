// 컴포넌트가 제대로 만들어 졌는지 테스트하기 위한 공간

import axios from "axios";
import UserEdit from "./UserEdit.js"

export default function Test() {
  const handleOnClick = () => {
    axios({
      method: "get",
      url: "https://node5.wookoo.shop/api/content"
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <>
      <UserEdit />
      <button className="btn btn-primary" onClick={handleOnClick}>Test /content</button>
    </>
  );
}