import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContextPro';
import useMessages from './Usemessages';
import MessageModal from './Messagemodal';
import MessageBox from './Messagebox';

const MemberList = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
    const { currentUser } = useAuth();
    const navigator = useNavigate();

    const [modalTarget, setModalTarget] = useState(null);
    const [showMessageBox, setShowMessageBox] = useState(false);

    const { received, sent, unreadCount, sendMessage, markRead, deleteMessage } = useMessages(currentUser?.userId);

    useEffect(() => {
        if (!currentUser) { 
            alert("로그인이 필요합니다."); navigator('/login'); 
        }
    }, []);

    const deleteUser = (index) => {
        const updated = users.filter((_, i) => i !== index);
        setUsers(updated);
        localStorage.setItem("users", JSON.stringify(updated));
    };

    if (!currentUser) return null;

    const isAdmin = currentUser.userId === "admin";
    const isMe = (user) => user.userId === currentUser.userId;

    return (
        <div className="flex justify-center items-start pt-16 min-h-screen bg-gray-100 px-4">
            <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm w-full max-w-[820px]">

                {/* 상단: 타이틀 + 메세지함 버튼 */}
                <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-5">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">회원 목록</h1>
                        <p className="text-sm text-gray-500 mt-1">커뮤니티의 모든 멤버를 확인하고 메시지를 보낼 수 있습니다.</p>
                    </div>
                    <button
                        onClick={() => setShowMessageBox(v => !v)}
                        className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all
                            ${showMessageBox 
                                ? 'bg-gray-900 text-white shadow-md' 
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                        <span>✉️</span> 메세지함
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* 메세지함 패널 */}
                {showMessageBox && (
                    <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                        <MessageBox
                            received={received}
                            sent={sent}
                            onClose={() => setShowMessageBox(false)}
                            onMarkRead={markRead}
                            onDelete={deleteMessage}
                        />
                        <div className="mt-8 border-t border-gray-100" />
                    </div>
                )}

                {/* 테이블 헤더 - 가독성을 위해 배경색 제거 및 선으로 강조 */}
                <div className="flex justify-between items-center px-4 py-3 border-y border-gray-100 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>아이디</span>
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>이름</span>
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>생년월일</span>
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>소통</span>
                    {isAdmin && <span className="w-1/5 text-center text-red-400">관리</span>}
                </div>

                {/* 회원 목록 */}
                <ul className="divide-y divide-gray-50">
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <li key={index} className="flex justify-between items-center px-4 py-4 text-sm hover:bg-gray-50/50 transition-colors group">
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center font-semibold text-gray-800`}>
                                    {user.userId}
                                    {isMe(user) && <span className="ml-1.5 text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-md">ME</span>}
                                </span>
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center text-gray-600`}>{user.name}</span>
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center text-gray-500 font-mono`}>{user.birthDate}</span>
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>
                                    {!isMe(user) && (
                                        <button
                                            onClick={() => setModalTarget(user.userId)}
                                            className="bg-[#1A1F2C] text-white text-xs px-4 py-1.5 rounded-lg font-medium shadow-sm 
                                                    hover:bg-[#2D3343] transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
                                        >
                                            <span className="text-[#D1D5DB]">✉️</span>
                                            <span>메세지</span>
                                        </button>
                                    )}
                                </span>
                                {isAdmin && (
                                    <span className="w-1/5 text-center">
                                        <button
                                            onClick={() => deleteUser(index)}
                                            className="opacity-0 group-hover:opacity-100 bg-red-50 text-red-500 text-xs px-3 py-1.5 rounded hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            제거
                                        </button>
                                    </span>
                                )}
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-gray-400 py-16 text-sm italic">
                            현재 가입된 회원이 없습니다.
                        </li>
                    )}
                </ul>
            </div>

            {/* 메세지 보내기 모달 */}
            {modalTarget && (
                <MessageModal
                    recipient={modalTarget}
                    onClose={() => setModalTarget(null)}
                    onSend={sendMessage}
                />
            )}
        </div>
    );
};

export default MemberList;