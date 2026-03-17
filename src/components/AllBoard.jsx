import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllBoard = () => {

    const [posts, setPosts]=useState([]);
    const [currentUser, setCurrentUser]=useState(null);
    const [selectedPost, setSelectedPost]=useState(null);
    const [search, setSearch]=useState("");

    useEffect(()=>{
        const storedPosts=JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);

        const storedUser=JSON.parse(localStorage.getItem("currentUser")) || null;
        setCurrentUser(storedUser);
    },[]);

    const handleDelete=(id)=>{
        const updated=posts.filter((post) => post.id !== id);
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));
        setSelectedPost(null);
    }

    const isAdmin = currentUser?.userId === 'admin';

    const filteredPosts=posts.filter((post)=>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.writerName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">게시글 목록</h1>
            </div>
            <input type="text" placeholder="제목 또는 작성자 검색..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 mb-4 rounded"/>

            <div className="space-y-3">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post)=>(
                        <div key={post.id} className="border p-4 rounded shadow flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => setSelectedPost(post)}>
                            <div>
                                <div>{post.title}</div>
                                <div className="text-sm text-gray-500">작성자: {post.writerName}</div>
                            </div>

                            <div className="flex gap-3" onClick={(e) => e.stopPropagation()} >
                                {currentUser && currentUser.userId === post.writerId && (
                                    <>
                                        <Link to={`/board/edit/${post.id}`} className="text-blue-500">수정</Link>
                                        <button onClick={()=> handleDelete(post.id)} className="text-red-500">삭제</button>
                                    </>
                                )}
                                {isAdmin && currentUser.userId !== post.writerId && (
                                    <button onClick={()=> handleDelete(post.id)} className="text-red-500">삭제</button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>검색 결과 없음</div>
                )}
            </div>

            {/* 모달 팝업 */}
            {selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedPost(null)} >
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()} >
                        <div className="flex justify-between items-center mb-4 border-b pb-3">
                            <h2 className="text-xl font-bold">{selectedPost.title}</h2>
                            <button onClick={() => setSelectedPost(null)}  className="text-gray-500 text-2xl">
                                &times;
                                </button>
                        </div>

                        <div className="text-sm text-gray-500 mb-4">
                            작성자: {selectedPost.writerName}
                        </div>

                        <div className="text-gray-700 whitespace-pre-wrap min-h-[100px]">
                            {selectedPost.content}
                        </div>

                        <div className="flex justify-end gap-2 mt-6 pt-3 border-t">
                            {currentUser && currentUser.userId === selectedPost.writerId && (
                                <>
                                    <Link to={`/board/edit/${selectedPost.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
                                        수정
                                    </Link>
                                    <button onClick={() => handleDelete(selectedPost.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                        삭제
                                    </button>
                                </>
                            )}
                            {isAdmin && currentUser.userId !== selectedPost.writerId && (
                                <button onClick={() => handleDelete(selectedPost.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                    삭제
                                </button>
                            )}
                            <button onClick={() => setSelectedPost(null)} className="bg-gray-300 px-4 py-2 rounded">
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