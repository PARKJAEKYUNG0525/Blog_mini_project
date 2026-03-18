import { useState, useCallback } from 'react';

// 데이터가 어떻게 저장 및 관리 하는지 
const loadMessages = () => JSON.parse(localStorage.getItem("messages")) || [];
const saveMessages = (msgs) => localStorage.setItem("messages", JSON.stringify(msgs));

const useMessages = (currentUserId) => {
    const [messages, setMessages] = useState(loadMessages);

    // 읽지 않은 메세지 수
    const unreadCount = messages.filter(m => m.to === currentUserId && !m.read).length;

    // 받은 / 보낸 메세지
    const received = messages.filter(m => m.to === currentUserId);
    const sent = messages.filter(m => m.from === currentUserId);

    // 메세지 보내기
    const sendMessage = useCallback((recipientId, text) => {
        const newMsg = {
            id: Date.now(),
            from: currentUserId,
            to: recipientId,
            message: text,
            createdAt: new Date().toLocaleString('ko-KR'),
            read: false,
        };
        setMessages(prev => {
            const updated = [...prev, newMsg];
            saveMessages(updated);
            return updated;
        });
    }, [currentUserId]);

    // 읽음 처리
    const markRead = useCallback((id) => {
        setMessages(prev => {
            const updated = prev.map(m => m.id === id ? { ...m, read: true } : m);
            saveMessages(updated);
            return updated;
        });
    }, []);

    // 메세지 삭제
    const deleteMessage = useCallback((id) => {
        setMessages(prev => {
            const updated = prev.filter(m => m.id !== id);
            saveMessages(updated);
            return updated;
        });
    }, []);

    return { received, sent, unreadCount, sendMessage, markRead, deleteMessage };
};

export default useMessages;