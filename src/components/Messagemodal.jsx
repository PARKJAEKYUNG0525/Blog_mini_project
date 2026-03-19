import React, { useState } from 'react';

const MessageModal = ({ recipient, onClose, onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (!text.trim()) { alert('You must be logged in.'); return; }
        onSend(recipient, text.trim());
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            {/* 핸드폰 본체 프레임 */}
            <div className="relative bg-[#1a1a1b] rounded-[3rem] p-3 shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[6px] border-[#333] w-[340px] h-[650px] flex flex-col overflow-hidden">
                
                {/* 상단 스피커 & 노치 부분 */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1a1a1b] rounded-full z-20 flex justify-center items-center">
                    <div className="w-10 h-1 bg-[#333] rounded-full"></div>
                </div>

                {/* 내부 화면 영역 */}
                <div className="bg-white w-full h-full rounded-[2.2rem] overflow-hidden flex flex-col relative pt-8">
                    
                    {/* 모바일 상태바 표시 (시간, 아이콘 등) */}
                    <div className="flex justify-between px-6 py-2 text-[10px] font-bold text-gray-800">
                        <span>9:41</span>
                        <div className="flex gap-1 items-center">
                            <span className="w-3 h-3 bg-black rounded-full scale-[0.6]"></span>
                            <span className="tracking-tighter">LTE</span>
                        </div>
                    </div>

                    {/* 앱 헤더 */}
                    <div className="flex items-center px-4 py-3 border-b border-gray-100  bg-gray-900">
                        <button onClick={onClose} className="text-xl mr-3">←</button>
                        <h2 className="text-sm font-bold text-white shadow-md">NEW MESSAGE</h2>
                    </div>

                    {/* 메인 컨텐츠 영역 */}
                    <div className="flex-1 p-5 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] text-gray-400 ml-1">Recipient</label>
                            <div className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700">
                                {recipient}
                            </div>
                        </div>

                        <textarea
                            className="flex-1 w-full text-sm resize-none focus:outline-none placeholder:text-gray-300 py-2"
                            placeholder="Please enter a message..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            autoFocus
                        />
                    </div>

                    {/* 하단 액션바 */}
                    <div className="p-4 border-t border-gray-50 flex justify-between items-center bg-white mb-6">
                        <div className="flex gap-3 text-gray-400">
                            <span className="cursor-pointer"></span>
                            <span className="cursor-pointer"></span>
                        </div>
                        <button 
                                onClick={handleSend} 
                                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-gray-900 text-white shadow-md hover:bg-gray-800 active:scale-95"
                            >
                                SEND
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;