// App Component

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './page/Main.js';
import LogIn from './page/LogIn.js';
import AuthEmail from './page/AuthEmail.js';
import AuthSuccess from './page/AuthSuccess.js'
import { setRefreshToken, getRefreshToken, removeRefreshToken } from './store/cookie.js';

export default function App() {
  const setRefToken = () => {
    setRefreshToken("yay");
  }

  const getRefToken = () => {
    console.log(getRefreshToken());
  }

  const remRefToken = () => {
    removeRefreshToken();
  }

  return (
    <div className="App bg-base-100">
      <button className="btn btn-primary" onClick={setRefToken}>get Token!!!</button>
      <button className="btn btn-primary" onClick={getRefToken}>show Token!!!</button>
      <button className="btn btn-primary" onClick={remRefToken}>remove Token!!!</button>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/auth_email" element={<AuthEmail />} />
          <Route path="/auth_success" element={<AuthSuccess />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
