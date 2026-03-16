import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [userId, setUserId]=useState('');
    const [password, setPassword]=useState('');
    const navigator=useNavigate();

    const onSubmit1=(e)=>{
        e.preventDefault();

        const user={userId, password}; //입력한 값을 객체로 담음(로컬스토리지에 저장하려고)

        let users=JSON.parse(localStorage.getItem("users")) || [] ;
        users.push(user); //처음에는 빈배열이므로 빈배열에 푸쉬(삽입)

        localStorage.setItem("users",JSON.stringify(users));
        //빈배열에 추가한 userId, password를 로컬스토리지에 저장

        setUserId("");
        setPassword("");

        navigator('/login');
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={onSubmit1} className="bg-white p-8 rounded shadow w-80">
                  <h1 className="text-xl font-bold mb-4 text-center">회원 가입</h1>
                아이디 :<input  className="border w-full p-2 mb-3 rounded" type='text' value={userId} onChange={(e)=>setUserId(e.target.value)}></input>
                비밀번호 : <input   className="border w-full p-2 mb-4 rounded" type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            
                 <button className="bg-green-500 text-white w-full py-2 rounded">회원가입</button>
            </form>
    
        </div>
    );
};

export default SignUp;