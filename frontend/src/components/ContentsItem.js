// 컨텐츠(멜로디/보컬.음반) 항목

import { useState } from "react";
import ContentsArt from "./ContentsArt.js";
import ContentsTitleAndArtist from "./ContentsTitleAndArtist.js";
import axios from "axios";


export default function ContentsItem({ contentsId, size, albumArt, title = "Title", artist = "artist", showFavorite = true, isFavorite = false }) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleOnClickFavorite = () => {
    // axios({
    //   method: "",
    //   url: ""
    // })
    // .then((response) => {
    //   setIsFavorite(!isFavorite);
    // })
    // .catch((error) => {
    //   alert(error.message);
    // })
    setFavorite(!favorite);
  }
  
  return (
    <div style={{width: `${size}px`}} className="items-center`">
      <ContentsArt size={size} contentsId={contentsId} albumArt={albumArt} isFavorite={favorite} onClickFavorite={handleOnClickFavorite} showFavorite={showFavorite} />
      <ContentsTitleAndArtist title={title} artist={artist} />
    </div>
  );
}
