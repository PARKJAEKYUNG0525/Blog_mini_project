import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContextPro';

const MemberList = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
    const { currentUser } = useAuth();

    const deleteUser = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-96">
                <h1 className="text-xl font-bold mb-4 text-center">회원 목록</h1>

                {currentUser && currentUser.userId === "admin" && currentUser.password === "admin" ? (
                    <>
                        {/* 테이블 헤더 */}
                        <div className="flex justify-between items-center bg-gray-200 px-3 py-2 rounded mb-1 text-sm font-bold">
                            <span className="w-1/4 text-center">아이디</span>
                            <span className="w-1/4 text-center">이름</span>
                            <span className="w-1/4 text-center">생년월일</span>
                            <span className="w-1/4 text-center">관리</span>
                        </div>

                        {/* 회원 목록 */}
                        <ul>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <li key={index} className="flex justify-between items-center border-b px-3 py-2 text-sm">
                                        <span className="w-1/4 text-center">{user.userId}</span>
                                        <span className="w-1/4 text-center">{user.name}</span>
                                        <span className="w-1/4 text-center">{user.birthDate}</span>
                                        <span className="w-1/4 text-center">
                                            <button
                                                onClick={() => deleteUser(index)}
                                                className="bg-red-500 text-white text-xs px-3 py-1 rounded"
                                            >
                                                삭제
                                            </button>
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-center text-gray-400 py-4">회원이 없습니다</li>
                            )}
                        </ul>
                    </>
                ) : (
                    <div className="text-center text-black-500 py-4">
                        <>
                        {/* 테이블 헤더 */}
                        <div className="flex justify-between items-center bg-gray-200 px-3 py-2 rounded mb-1 text-sm font-bold">
                            <span className="w-1/3 text-center">아이디</span>
                            <span className="w-1/3 text-center">이름</span>
                            <span className="w-1/3 text-center">생년월일</span>
                        </div>

                        {/* 회원 목록 */}
                        <ul>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <li key={index} className="flex justify-between items-center border-b px-3 py-2 text-sm">
                                        <span className="w-1/3 text-center">{user.userId}</span>
                                        <span className="w-1/3 text-center">{user.name}</span>
                                        <span className="w-1/3 text-center">{user.birthDate}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-center text-gray-400 py-4">회원이 없습니다</li>
                            )}
                        </ul>
                    </>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemberList;