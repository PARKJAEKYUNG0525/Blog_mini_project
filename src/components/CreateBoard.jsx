import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);

        const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
        setCurrentUser(storedUser);
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return; // 사용자 확인 추가
        const updated = posts.filter((post) => post.id !== id);
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));
    };

    return (
        /* 전체 배경: 화이트, 여백 확보 */
        <div className="min-h-screen bg-white pt-20 px-4">
            <div className="max-w-6xl mx-auto flex gap-12">
                
                {/* 좌측: 회원 정보 섹션 (심플 카드 디자인) */}
                <div className="w-64 flex flex-col items-center border border-gray-100 p-8 rounded-2xl h-fit sticky top-24">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                         {/* 기본 아바타 아이콘 */}
                         <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    </div>
                    <h2 className="font-bold text-lg text-gray-800 mb-1">{currentUser?.name || "사용자"}</h2>
                    <span className="text-xs text-gray-400 mb-6 font-medium">회원</span>
                    
                    <div className="w-full space-y-3 border-t border-gray-50 pt-6 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400 font-medium">이름</span>
                            <span className="text-gray-700">{currentUser?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 font-medium">생년월일</span>
                            <span className="text-gray-700">{currentUser?.birthDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 font-medium">게시글</span>
                            <span className="font-bold text-green-500">
                                {posts.filter(p => p.writerId === currentUser?.userId).length}개
                            </span>
                        </div>
                    </div>
                    
                    <Link to="/board/create" className="mt-8 w-full bg-green-500 text-white px-3 py-2.5 rounded-xl text-sm font-bold text-center hover:bg-green-600 transition-all shadow-sm">
                        글쓰기
                    </Link>
                </div>

                {/* 우측: 게시글 목록 섹션 */}
                <div className="flex-1">
                    <div className="flex justify-between items-end mb-8 border-b border-gray-50 pb-5">
                        <h1 className="text-2xl font-bold text-gray-900">게시글 목록</h1>
                        <span className="text-sm text-gray-400 font-medium">Total: {posts.length}</span>
                    </div>
                    
                    <div className="space-y-4">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.id} className="group border border-gray-100 p-6 rounded-2xl hover:bg-gray-50/50 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                                {post.content}
                                            </p>
                                        </div>

                                        {/* 작성자 본인일 경우 수정/삭제 노출 */}
                                        {currentUser && currentUser.userId === post.writerId && (
                                            <div className="flex gap-3 ml-4">
                                                <Link to={`/board/edit/${post.id}`} className="text-xs font-bold text-blue-400 hover:text-blue-600">수정</Link>
                                                <button onClick={() => handleDelete(post.id)} className="text-xs font-bold text-red-300 hover:text-red-500">삭제</button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-400 font-medium">
                                        <span>작성자: {post.writerName || currentUser?.name}</span>
                                        <span>•</span>
                                        <span>{new Date(post.id).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center text-gray-300 italic border border-dashed border-gray-100 rounded-3xl">
                                등록된 게시물이 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardList;