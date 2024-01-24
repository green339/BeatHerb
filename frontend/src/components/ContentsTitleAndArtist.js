// 각 컨텐츠의 제목과 아티스트

import styles from "./ContentsTitleAndArtist.module.css"

export default function ContentsTitleAndArtist({ title, artist }) {
  return (
    <>
      <p className={styles.title}>{ title }</p>
      <p className={styles.artists}>{ artist }</p>
    </>
  );
}