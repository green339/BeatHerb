// App Component

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './page/Main.js';
import Admin from './page/Admin.js';
import LogIn from './page/LogIn.js';
import AuthEmail from './page/AuthEmail.js';
import AuthSuccess from './page/AuthSuccess.js'
import AuthRedirection from './page/AuthRedirection.js';
import Board from './page/Board.js';
import Test from './page/Test.js';
import MyPage from './page/MyPage.js';
import WorkPlace from './page/WorkPlace.js';
import ContentDetail from './page/ContentDetail.js';
import UploadMusic from './page/UploadMusic.js';
import TestModal from './page/TestModal.js';
import UserEdit from './page/UserEdit.js';
import Live from './page/Live.js';


export default function App() {
  return (
    <div className="App bg-base-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/auth_email" element={<AuthEmail />} />
          <Route path="/auth_success" element={<AuthSuccess />} />
          <Route path="/auth/redirect/:provider" element={<AuthRedirection />} />
          <Route path="/board/:category" element={<Board />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/upload_music" element={<UploadMusic />} />
          <Route path="/useredit" element={<UserEdit />} />
          <Route path="/content/:id" element={<ContentDetail />} />
          <Route path="/workplace" element={<WorkPlace />} />
          <Route path="/live/:id" element={<Live />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test_modal" element={<TestModal />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
