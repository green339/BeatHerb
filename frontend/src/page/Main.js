// 메인 페이지
import MainButton from '../components/MainButton';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

export default function Main() {
  return (
    <>
      <Link to="/login">
        <button className="btn btn-outline btn-primary fixed top-2 right-2">로그인</button>
      </Link>
      
      <div className="absolute w-full right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2">
        <div className="my-16">
          <p className="text-9xl text-primary">BeatHerb</p>
        </div>

        <div className="my-16">
          <SearchBar />
        </div>
        
        <div className="flex flex-row justify-center my-16">
          <div className="flex mx-1.5">
            <MainButton imgSrc="https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04" text="test" />
          </div>
          <div className="flex mx-1.5">
            <MainButton imgSrc="https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04" text="test" />
          </div>
          <div className="flex mx-1.5">
            <MainButton imgSrc="https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04" text="test" />
          </div>
        </div>
      </div>
    </>
  );
}