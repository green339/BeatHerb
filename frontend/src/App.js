// App Component

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './page/Main.js';
import LogIn from './page/LogIn.js';
import AuthEmail from './page/AuthEmail.js';
import AuthSuccess from './page/AuthSuccess.js'
import AuthRedirection from './page/AuthRedirection.js';
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
          <Route path="/test" element={<Test />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
