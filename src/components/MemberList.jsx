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
            alert("You must be logged in."); 
            navigator('/login'); 
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
        <div className="flex justify-center items-start pt-16 min-h-screen bg-gray-50 px-4">
            <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm w-full max-w-[820px]">

                {/* Top: Title + Inbox Button */}
                <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-5">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Member List</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            View all members and send them messages.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowMessageBox(v => !v)}
                        className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-gray-900 text-white shadow-md hover:bg-gray-800"
                    >
                        IN MESSAGE
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Message Box Panel */}
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

                {/* Table Header */}
                <div className="flex justify-between items-center px-4 py-3 border-y border-gray-100 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>User ID</span>
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>Name</span>
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>Date of Birth</span>
                    <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>Message</span>
                    {isAdmin && <span className="w-1/5 text-center text-red-400">Admin</span>}
                </div>

                {/* Member List */}
                <ul className="divide-y divide-gray-50">
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <li key={index} className="flex justify-between items-center px-4 py-4 text-sm hover:bg-gray-50/50 transition-colors group">
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center font-semibold text-gray-800`}>
                                    {user.userId}
                                    {isMe(user) && (
                                        <span className="ml-1.5 text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-md uppercase">
                                            Me
                                        </span>
                                    )}
                                </span>
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center text-gray-600`}>
                                    {user.name}
                                </span>
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center text-gray-500 font-mono`}>
                                    {user.birthDate}
                                </span>
                                <span className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>
                                    {!isMe(user) && (
                                        <button
                                            onClick={() => setModalTarget(user.userId)}
                                            className="bg-[#1A1F2C] text-white text-xs px-4 py-1.5 rounded-lg font-medium shadow-sm 
                                                    hover:bg-[#2D3343] transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
                                        >
                                            <span>MSG</span>
                                        </button>
                                    )}
                                </span>
                                {isAdmin && (
                                    <span className="w-1/5 text-center">
                                        <button
                                            onClick={() => deleteUser(index)}
                                            className="bg-gray-100 text-gray-500 text-[11px] px-3.5 py-1.5 rounded-lg hover:bg-gray-200 hover:text-gray-700 transition-all active:scale-95 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </span>
                                )}
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-gray-400 py-16 text-sm italic">
                            No members have registered yet.
                        </li>
                    )}
                </ul>
            </div>

            {/* Message Modal */}
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