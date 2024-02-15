import axios from "axios";

export function getHashtag() {
  return axios({
    method: "GET",
    url: "https://node5.wookoo.shop/api/content/hashtag",
    mode: "cors",
    params: {
      name: null,
    },
  });
}
