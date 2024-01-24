// 컨텐츠 아트

import styles from "./ContentsArt.module.css";
import { Icon } from "semantic-ui-react";

export default function ContentsArt({ isFavorite, onClickFavorite }) {

  return (
    <div className={styles.container}>
      <img src="https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04" />
      <Icon name={isFavorite ? "heart" : "heart outline"} color="red" size="big" className={styles.favorites} onClick={onClickFavorite}/>
    </div>
  );
}