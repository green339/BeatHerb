// 컨텐츠(멜로디/보컬.음반) 그리드 항목

import styles from "./ContentsItem.module.css";
import { useState } from "react";
import ContentsArt from "./ContentsArt.js";
import ContentsTitleAndArtist from "./ContentsTitleAndArtist.js";


export default function ContentsItem() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={styles.component}>
      <ContentsArt isFavorite={isFavorite} onClickFavorite={() => setIsFavorite(!isFavorite)}/>
      <ContentsTitleAndArtist title="Title" artist="artist" />
    </div>
  );
}
