import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [userId, setUserId]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [errors, setErrors]=useState({});
    const navigator=useNavigate();

    const validate = () => {
        const newErrors = {};

        if (userId.length < 4) {
            newErrors.userId = '아이디는 4글자 이상이어야 합니다.';
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const isDuplicate = users.some(user => user.userId === userId);
        if (isDuplicate) {
            newErrors.userId = '이미 사용 중인 아이디입니다.';
        }

        if (password.length < 4) {
            newErrors.password = '비밀번호는 4글자 이상이어야 합니다.';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }

        return newErrors;
    };

    const onSubmit1=(e)=>{
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const user={userId, password};

        let users=JSON.parse(localStorage.getItem("users")) || [] ;
        users.push(user);

        localStorage.setItem("users",JSON.stringify(users));

        setUserId("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});

        navigator('/login');
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={onSubmit1} className="bg-white p-8 rounded shadow w-80">
                  <h1 className="text-xl font-bold mb-4 text-center">회원 가입</h1>
                아이디 :<input  className="border w-full p-2 mb-1 rounded" type='text' value={userId} onChange={(e)=>{setUserId(e.target.value); setErrors(prev=>({...prev, userId:''}))}}></input>
                {errors.userId && <p className="text-red-500 text-xs mb-2">{errors.userId}</p>}
                비밀번호 : <input   className="border w-full p-2 mb-1 rounded" type='password' value={password} onChange={(e)=>{setPassword(e.target.value); setErrors(prev=>({...prev, password:''}))}}></input>
                {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password}</p>}
                비밀번호 확인 : <input className="border w-full p-2 mb-1 rounded" type='password' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value); setErrors(prev=>({...prev, confirmPassword:''}))}}></input>
                {errors.confirmPassword && <p className="text-red-500 text-xs mb-2">{errors.confirmPassword}</p>}
            
                 <button className="bg-green-500 text-white w-full py-2 rounded mt-2">회원가입</button>
            </form>
    
        </div>
    );
};

export default SignUp;