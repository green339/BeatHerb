// 메인 페이지
import MainButton from '../components/MainButton';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import UserButton from '../components/UserButton';

export default function Main() {
  return (
    <div>
      <div class="fixed top-2 right-2 z-10">
        <UserButton />  
      </div>
      
      <div className="absolute w-full right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 flex flex-col items-center">
        <div>
          <p className="text-9xl text-primary">BeatHerb</p>
        </div>

        <div className="my-16 w-1/2 min-w-96">
          <SearchBar />
        </div>
        
        <div className="flex flex-row justify-center">
          <Link to="/board/contents" className="text-primary-content hover:text-primary-content">
            <div className="flex mx-1.5">
              <MainButton imgSrc="https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04" text="컨텐츠" />
            </div>
          </Link>
          <Link to="/board/shorts" className="text-primary-content hover:text-primary-content">
            <div className="flex mx-1.5">
              <MainButton imgSrc="https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04" text="Shorts" />
            </div>
          </Link>
          <Link to="/workplace" className="text-primary-content hover:text-primary-content">
            <div className="flex mx-1.5">
              <MainButton imgSrc="https://img.freepik.com/free-vector/background-colorful-musical-notes_23-2147633120.jpg?w=740&t=st=1705448093~exp=1705448693~hmac=00f2208917eeabe7c5309cb7efc90defc713277bede12138776ae696c5456d04" text="작업실" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}