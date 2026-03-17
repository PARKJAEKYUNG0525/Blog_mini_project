import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContextPro';

const MemberList = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
    const { currentUser } = useAuth();
    const navigator = useNavigate();

    // 로그인 체크
    useEffect(() => {
        if (!currentUser) {
            alert("로그인이 필요합니다.");
            navigator('/login');
        }
    }, []);

    const deleteUser = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    // 비로그인 시 아무것도 렌더링 안함
    if (!currentUser) return null;

    const isAdmin = currentUser.userId === "admin";

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-96">
                <h1 className="text-xl font-bold mb-4 text-center">회원 목록</h1>

                {/* 테이블 헤더 */}
                <div className={`flex justify-between items-center bg-gray-200 px-3 py-2 rounded mb-1 text-sm font-bold`}>
                    <span className={`${isAdmin ? 'w-1/4' : 'w-1/3'} text-center`}>아이디</span>
                    <span className={`${isAdmin ? 'w-1/4' : 'w-1/3'} text-center`}>이름</span>
                    <span className={`${isAdmin ? 'w-1/4' : 'w-1/3'} text-center`}>생년월일</span>
                    {isAdmin && <span className="w-1/4 text-center">관리</span>}
                </div>

                {/* 회원 목록 */}
                <ul>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <li key={index} className="flex justify-between items-center border-b px-3 py-2 text-sm">
                                <span className={`${isAdmin ? 'w-1/4' : 'w-1/3'} text-center`}>{user.userId}</span>
                                <span className={`${isAdmin ? 'w-1/4' : 'w-1/3'} text-center`}>{user.name}</span>
                                <span className={`${isAdmin ? 'w-1/4' : 'w-1/3'} text-center`}>{user.birthDate}</span>
                                {isAdmin && (
                                    <span className="w-1/4 text-center">
                                        <button
                                            onClick={() => deleteUser(index)}
                                            className="bg-red-500 text-white text-xs px-3 py-1 rounded"
                                        >
                                            삭제
                                        </button>
                                    </span>
                                )}
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-gray-400 py-4">회원이 없습니다</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MemberList;