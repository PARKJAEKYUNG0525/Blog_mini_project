import React from 'react';
import { useAuth } from './AuthContextPro';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {

    const [userId, setUserId]=useState('');
    const [password, setPassword]=useState('');
    const navigator=useNavigate();

    //useAuth함수호출
    const {setCurrentUser} = useAuth();


    const onSubmit2=(e)=>{
        e.preventDefault();
        
        let users=JSON.parse(localStorage.getItem("users")) || [] ;

        const loginUser= users.find((user)=> user.userId === userId && user.password === password);

        //로그인 성공 시 사용자 정보 로컬스토리지에 저장
        if(loginUser){
            setCurrentUser(loginUser);

            localStorage.setItem("currentUser", JSON.stringify(loginUser))

            setUserId("");
            setPassword("");

            navigator('/Home');
        }
        else{
            alert('아이디 또는 비밀번호 오류');
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={onSubmit2} className="bg-white p-8 rounded shadow w-80">
                <h1 className="text-xl font-bold mb-4 text-center">로그인</h1>
                아이디 :<input className="border w-full p-2 mb-3 rounded" type='text' value={userId} onChange={(e)=>setUserId(e.target.value)}></input>
                비밀번호 : <input className="border w-full p-2 mb-4 rounded" type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            
                 <button className="bg-blue-500 text-white w-full py-2 rounded">로그인</button>
            </form>
    
        </div>
    );
};

export default Login;