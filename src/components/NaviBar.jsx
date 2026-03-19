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
        <nav className="bg-gray-100 p-4">
       <div className="max-w-5xl mx-auto flex justify-between items-center">
       <div className="flex gap-6 font-semibold text-gray-700">
       <Link to="/" className="hover:text-black transition-colors hover:underline">HOME</Link>
      <Link to="/memberList" className="hover:text-black transition-colors hover:underline">USERS</Link>
      <Link to="/allBoard" className="hover:text-black transition-colors hover:underline">All POSTS</Link>
      <Link to="/myBoard" className="hover:text-black transition-colors hover:underline">MY POSTS</Link>
      <Link to="/calendar" className="hover:text-black transition-colors hover:underline">CALENDAR</Link>
              </div>

        <div className="flex gap-4 items-center">
    {currentUser ? (
    <>
      <span className="text-lg">{currentUser.userId}</span>
      <button 
      onClick={logout1} 
      className="bg-[#1A1F2C] text-white text-xs px-4 py-1.5 rounded-lg font-medium shadow-sm 
                hover:bg-[#321F1F] transition-all active:scale-95 flex items-center justify-center gap-2">
      LOGOUT
    </button>
    </>
  ) : (
    <>
      <Link to="/login">LOGIN</Link>
      <Link to="/join">SIGN UP</Link>
    </>
  )}
</div>
            </div>
            </nav>

    );
};

export default NaviBar;

