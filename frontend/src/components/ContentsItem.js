// 컨텐츠(멜로디/보컬.음반) 항목

import { useState } from "react";
import ContentsArt from "./ContentsArt.js";
import ContentsTitleAndArtist from "./ContentsTitleAndArtist.js";
import axios from "axios";
import { useAuthStore } from "../store/AuthStore.js";


export default function ContentsItem({ contentId, size, albumArt, title = "Title", artist = "artist", showFavorite = true, isFavorite = false }) {
  const [favorite, setFavorite] = useState(isFavorite);
  const { accessToken } = useAuthStore();

  const handleOnClickFavorite = () => {
    const serverUrl = process.env.REACT_APP_TEST_SERVER_BASE_URL;

    axios({
      method: (favorite ? "delete" : "post"),
      url: `${serverUrl}/content/star`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        contentId: contentId
      }
    })
    .then((response) => {
      setFavorite(!favorite);
    })
    .catch((error) => {
      alert(error.response.data.message);
    })
  }
  
  return (
    <div style={{width: `${size}px`}} className="items-center`">
      <ContentsArt size={size} contentId={contentId} albumArt={albumArt} isFavorite={favorite} onClickFavorite={handleOnClickFavorite} showFavorite={showFavorite} />
      <ContentsTitleAndArtist title={title} artist={artist} />
    </div>
  );
}
