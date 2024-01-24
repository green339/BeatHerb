import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './page/Main';
import LogIn from './page/LogIn';

export default function App() {
  return (
    <div className="App bg-base-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/sign_in" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
