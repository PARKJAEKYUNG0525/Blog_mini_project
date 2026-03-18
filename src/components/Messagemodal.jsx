import React, { useState } from 'react';

// 특정 사용자(recipient)에게 메시지 보내는 입력창
const MessageModal = ({ recipient, onClose, onSend }) => {
    const [text, setText] = useState('');

    // 공백 확인, 부모로 메시지 전달
    const handleSend = () => {
        if (!text.trim()) { alert('메세지를 입력해주세요.'); return; }
        onSend(recipient, text.trim());
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-bold text-gray-800">✉️ 메세지 보내기</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
                </div>

                <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-sm">
                    <span className="text-gray-400">받는 사람</span>
                    <span className="font-bold text-blue-600">{recipient}</span>
                </div>

                <textarea
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                    rows={5}
                    placeholder="메세지를 입력하세요..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    autoFocus
                />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50">
                        취소
                    </button>
                    <button onClick={handleSend} className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 font-semibold">
                        보내기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;