import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from './home';
import UserInfo from './userInfo';
import LogIn from './logIn';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/userInfo" element={ <UserInfo /> } />
          <Route path="/logIn" element={ <LogIn /> } />
        </Route>
      </Routes>
    </>
  );
}

