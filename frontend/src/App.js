// App Component

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './page/Main.js';
import LogIn from './page/LogIn.js';
import AuthEmail from './page/AuthEmail.js';
import AuthSuccess from './page/AuthSuccess.js'
import AuthRedirection from './page/AuthRedirection.js';
import Board from './page/Board.js';
import Test from './page/Test.js';

export default function App() {
  return (
    <div className="App bg-base-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/auth_email" element={<AuthEmail />} />
          <Route path="/auth_success" element={<AuthSuccess />} />
          <Route path="/auth/redirect/:provider" element={<AuthRedirection />} />
          <Route path="/board/:category" element={<Board />} />
          <Route path="/workplace" element={<h1 className="text-primary">작업실 화면이에요~~~~~~~~</h1>} />
          <Route path="/test" element={<Test />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
