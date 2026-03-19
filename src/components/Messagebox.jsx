import React, { useState } from 'react';

// 받은/보낸 목록 + 상세보기 
const MessageBox = ({ received, sent, onClose, onMarkRead, onDelete }) => {
    const [tab, setTab] = useState('received');
    const [selected, setSelected] = useState(null);

    const list = tab === 'received' ? received : sent;
    const unreadCount = received.filter(m => !m.read).length;

    const handleSelect = (msg) => {
        if (tab === 'received' && !msg.read) {
            onMarkRead(msg.id);
        }
        setSelected(msg);
    };

    const handleDelete = (id) => {
        onDelete(id);
        if (selected?.id === id){
            setSelected(null);  
        } 
    };

    const switchTab = (next) => {
        setTab(next);
        setSelected(null);
    };

    return (
        <div className="mt-4 border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-gray-50">
            {/* 탭 헤더 */}
            <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-100">
                <div className="flex gap-1">
                    <button
                        onClick={() => switchTab('received')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all
                            ${tab === 'received' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        Received Messages
                        {unreadCount > 0 && (
                            <span className="ml-1.5 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => switchTab('sent')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all
                            ${tab === 'sent' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        Sent Messages
                    </button>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg font-bold">×</button>
            </div>

            {/* 목록 + 상세 */}
            <div className="flex" style={{ minHeight: '220px', maxHeight: '300px' }}>
                {/* 목록 */}
                <ul className="w-1/2 border-r border-gray-100 overflow-y-auto">
                    {list.length === 0 ? (
                        <li className="text-center text-gray-300 text-xs py-10">I don't have a message</li>
                    ) : (
                        list.map(msg => (
                            <li
                                key={msg.id}
                                onClick={() => handleSelect(msg)}
                                className={`px-3 py-2.5 cursor-pointer border-b border-gray-50 hover:bg-blue-50 transition-colors
                                    ${selected?.id === msg.id ? 'bg-blue-50' : 'bg-white'}`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-900 truncate">
                                        {tab === 'received' ? `${msg.from}` : `${msg.to}`}
                                    </span>
                                    {tab === 'received' && !msg.read && (
                                        <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 ml-1" />
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 truncate mt-0.5">{msg.message}</p>
                                <p className="text-[10px] text-gray-300 mt-0.5">{msg.createdAt}</p>
                            </li>
                        ))
                    )}
                </ul>

                {/* 상세 보기 */}
                <div className="w-1/2 p-4 overflow-y-auto bg-white">
                    {selected ? (
                        <div className="flex flex-col gap-2 h-full">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">
                                    {tab === 'received'
                                        ? <>Sender: <strong className="text-gray-700">{selected.from}</strong></>
                                        : <>Recipient: <strong className="text-gray-700">{selected.to}</strong></>
                                    }
                                </span>
                                <button
                                    onClick={() => handleDelete(selected.id)}
                                    className="text-[10px] text-gray-900 hover:text-gray-900 border border-gray-900 rounded px-1.5 py-0.5"
                                >
                                    DELETE
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-300">{selected.createdAt}</p>
                            <div className="flex-1 bg-gray-50 rounded-xl p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {selected.message}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-xs text-gray-300">
                            Please select a message.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBox;