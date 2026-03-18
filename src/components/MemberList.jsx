import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContextPro';
import useMessages from './useMessages';
import MessageModal from './MessageModal';
import MessageBox from './Messagebox';

const MemberList = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
    const { currentUser } = useAuth();
    const navigator = useNavigate();

    const [modalTarget, setModalTarget] = useState(null);
    const [showMessageBox, setShowMessageBox] = useState(false);

    // ✅ 메세지 관련 로직은 훅에서 전부 처리
    const { received, sent, unreadCount, sendMessage, markRead, deleteMessage } = useMessages(currentUser?.userId);

    useEffect(() => {
        if (!currentUser) { alert("로그인이 필요합니다."); navigator('/login'); }
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
        <div className="flex justify-center items-start pt-16 min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[820px]">

                {/* 상단: 타이틀 + 메세지함 버튼 */}
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-xl font-bold text-gray-800">회원 목록</h1>
                    <button
                        onClick={() => setShowMessageBox(v => !v)}
                        className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm
                            ${showMessageBox ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                    >
                        ✉️ 메세지함
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* 메세지함 패널 */}
                {showMessageBox && (
                    <MessageBox
                        received={received}
                        sent={sent}
                        onClose={() => setShowMessageBox(false)}
                        onMarkRead={markRead}
                        onDelete={deleteMessage}
                    />
                )}

                {showMessageBox && <div className="my-5 border-t border-gray-100" />}

                {/* 테이블 헤더 */}
                <div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg mb-1 text-xs font-bold text-gray-500 uppercase tracking-wide">
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>아이디</span>
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>이름</span>
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>생년월일</span>
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>메세지</span>
                    {isAdmin && <span className="w-1/5 text-center">관리</span>}
                </div>

                {/* 회원 목록 */}
                <ul>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <li key={index} className="flex justify-between items-center border-b border-gray-50 px-3 py-2.5 text-sm hover:bg-gray-50 rounded transition-colors">
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center font-medium text-gray-700`}>
                                    {user.userId}
                                    {isMe(user) && <span className="ml-1 text-[10px] text-blue-400 font-semibold">(나)</span>}
                                </span>
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center text-gray-600`}>{user.name}</span>
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center text-gray-500`}>{user.birthDate}</span>
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>
                                    {!isMe(user) && (
                                        <button
                                            onClick={() => setModalTarget(user.userId)}
                                            className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                                        >
                                            메세지
                                        </button>
                                    )}
                                </span>
                                {isAdmin && (
                                    <span className="w-1/5 text-center">
                                        <button
                                            onClick={() => deleteUser(index)}
                                            className="bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            삭제
                                        </button>
                                    </span>
                                )}
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-gray-300 py-8 text-sm">회원이 없습니다</li>
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