import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContextPro';

const AllBoard = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [search, setSearch] = useState("");
    const { currentUser } = useAuth();

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);
    }, []);

    const handleDelete = (id) => {
        const updated = posts.filter((post) => post.id !== id);
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));
        setSelectedPost(null);
    };

    const isAdmin = currentUser?.userId === 'admin';

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.writerName.toLowerCase().includes(search.toLowerCase())
    );

    const canEdit = (post) => currentUser?.userId === post.writerId;
    const canDelete = (post) => currentUser && (currentUser.userId === post.writerId || isAdmin);

    return (
        <div className="flex justify-center items-start pt-16 min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[820px]">

                {/* 상단 타이틀 */}
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-xl font-bold text-gray-800">게시글 목록</h1>
                    <span className="text-xs text-gray-400">총 {filteredPosts.length}개</span>
                </div>

                {/* 검색창 */}
                <input
                    type="text"
                    placeholder="제목 또는 작성자 검색..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                {/* 테이블 헤더 */}
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg mb-1 text-xs font-bold text-gray-500 uppercase tracking-wide">
                    <span className="w-1/2 text-center">제목</span>
                    <span className="w-1/4 text-center">작성자</span>
                    {isAdmin && (<span className="w-1/4 text-center">관리</span>)}
                </div>

                {/* 게시글 목록 */}
                <ul>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <li
                                key={post.id}
                                className="flex items-center border-b border-gray-50 px-3 py-2.5 text-sm hover:bg-gray-50 rounded transition-colors"
                            >
                                {/* 제목 — 클릭 시 모달 */}
                                <span
                                    className="w-1/2 text-center font-medium text-black-700 cursor-pointer hover:text-blue-500 transition-colors truncate px-2"
                                    onClick={() => setSelectedPost(post)}
                                >
                                    {post.title}
                                </span>

                                {/* 작성자 */}
                                <span className="w-1/4 text-center text-black-500" onClick={() => setSelectedPost(post)}>
                                {post.writerName}</span>

                                {/* 관리 버튼 */}
                                <span className="w-1/4 text-center flex justify-center gap-2">
                                    {canEdit(post) && (
                                        <Link
                                            to={`/board/edit/${post.id}`}
                                            className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                                        >
                                            수정
                                        </Link>
                                    )}
                                    {canDelete(post) && (
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            삭제
                                        </button>
                                    )}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-gray-300 py-10 text-sm">검색 결과가 없습니다.</li>
                    )}
                </ul>
            </div>

            {/* 상세 모달 */}
            {selectedPost && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={() => setSelectedPost(null)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4 flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 모달 헤더 */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-base font-bold text-gray-800 truncate pr-4">{selectedPost.title}</h2>
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="text-gray-400 hover:text-gray-600 text-xl font-bold flex-shrink-0"
                            >
                                ×
                            </button>
                        </div>

                        {/* 작성자 */}
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm">
                            <span className="text-gray-400">작성자</span>
                            <span className="font-semibold text-gray-700">{selectedPost.writerName}</span>
                        </div>

                        {/* 본문 */}
                        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap min-h-[120px] leading-relaxed">
                            {selectedPost.content}
                        </div>

                        {/* 모달 하단 버튼 */}
                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                            {canEdit(selectedPost) && (
                                <Link
                                    to={`/board/edit/${selectedPost.id}`}
                                    className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    수정
                                </Link>
                            )}
                            {canDelete(selectedPost) && (
                                <button
                                    onClick={() => handleDelete(selectedPost.id)}
                                    className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    삭제
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllBoard;