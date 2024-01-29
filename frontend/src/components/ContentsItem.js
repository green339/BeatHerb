// 컨텐츠(멜로디/보컬.음반) 그리드 항목

import { useState } from "react";
import ContentsArt from "./ContentsArt.js";
import ContentsTitleAndArtist from "./ContentsTitleAndArtist.js";


export default function ContentsItem({ size }) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <div style={{width: `${size}px`}} className="items-center`">
      <ContentsArt size={size} isFavorite={isFavorite} onClickFavorite={() => setIsFavorite(!isFavorite)}/>
      <ContentsTitleAndArtist title="Title" artist="artist" />
    </div>
  );
}
