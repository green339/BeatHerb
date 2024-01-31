// 컨텐츠(멜로디/보컬.음반) 항목

import { useState } from "react";
import ContentsArt from "./ContentsArt.js";
import ContentsTitleAndArtist from "./ContentsTitleAndArtist.js";


export default function ContentsItem({ contentsId, size, title = "Title", artist = "artist", showFavorite = true }) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <div style={{width: `${size}px`}} className="items-center`">
      <ContentsArt size={size} contentsId={contentsId} isFavorite={isFavorite} onClickFavorite={() => setIsFavorite(!isFavorite)} showFavorite={showFavorite} />
      <ContentsTitleAndArtist title={title} artist={artist} />
    </div>
  );
}
