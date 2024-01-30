// 라이브 항목

import ContentsTitleAndArtist from "./ContentsTitleAndArtist";

export default function LiveItem({ title = "Title", artist = "artist" }) {
  return (
    <div className="w-[300px] relative">
      <img className="w-[300px] h-[225px] rounded-md" src="https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04" alt="" />
      <ContentsTitleAndArtist title={title} artist={artist} />
    </div>
  );
}