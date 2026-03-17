import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NaviBar from './components/NaviBar';
import CreateBoard from './components/CreateBoard';
import AuthContextPro from './components/AuthContextPro';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MemberList from "./components/MemberList";
import EditBoard from "./components/EditBoard";
import AllBoard from './components/AllBoard';
import Calendar from './components/Calendar';
import "react-calendar/dist/Calendar.css"
import MyBoard from './components/MyBoard';

const App = () => {
  return (
    <AuthContextPro>
      <BrowserRouter>
        <NaviBar />
        <Routes>
          <Route path='/myBoard' element={<MyBoard />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/join' element={<SignUp />}></Route>
          <Route path='/memberList' element={<MemberList />}></Route>
          <Route path='/board/create' element={<CreateBoard />}></Route>
          <Route path='/board/edit/:id' element={<EditBoard />}></Route>
          <Route path='/allBoard' element={<AllBoard />}></Route>
          <Route path='/calendar' element={<Calendar />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextPro>
  );
};
// 수정
export default App;