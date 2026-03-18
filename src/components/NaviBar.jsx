import React from 'react';
import {Link} from "react-router-dom";
import { useAuth } from './AuthContextPro';
import { useNavigate } from 'react-router-dom';

const NaviBar = () => {

    const {currentUser, logout} = useAuth();
    const navigator=useNavigate();

    //로그아웃함수..logout함수호출하고 기본경로로 페이지이동
    const logout1=()=>{
        logout();
        navigator("/");
    }

    return (
        <nav className="bg-[#FEE500] shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <div className="flex gap-6 font-semibold text-[#3C1E1E]">
            <Link to="/" className="hover:text-white transition-colors">홈</Link>
            <Link to="/memberList" className="hover:text-white transition-colors">회원목록</Link>
            <Link to="/allBoard" className="hover:text-white transition-colors">전체 게시글</Link>
            <Link to="/myBoard" className="hover:text-white transition-colors">내 게시글</Link>
            <Link to="/calendar" className="hover:text-white transition-colors">캘린더</Link>
              </div>

        <div className="flex gap-4 items-center">
    {currentUser ? (
    <>
      <span>{currentUser.userId}님</span>
      <button onClick={logout1} className="bg-red-400 text-white px-3 py-1 rounded">로그아웃</button>
    </>
  ) : (
    <>
      <Link to="/login">로그인</Link>
      <Link to="/join">회원가입</Link>
    </>
  )}
</div>
            </div>
            </nav>

    );
};

export default NaviBar;

