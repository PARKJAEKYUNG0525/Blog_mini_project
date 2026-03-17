import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllBoard = () => {

    const [posts, setPosts]=useState([]);
    const [currentUser, setCurrentUser]=useState(null);
    const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글

    useEffect(()=>{
        const storedPosts=JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);

        const storedUser=JSON.parse(localStorage.getItem("currentUser")) || null;
        setCurrentUser(storedUser);
    },[])

    const handleDelete=(id)=>{
        const updated=posts.filter((post) => post.id !== id);
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));
        setSelectedPost(null); // 삭제 후 모달 닫기
    }

    const isAdmin = currentUser?.userId === 'admin';

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">게시글 목록</h1>
                <Link to="/board/create" className="bg-green-500 text-white px-3 py-1 rounded">글쓰기</Link>
            </div>

            <div className="space-y-3">
                {posts.length > 0 ? (
                    posts.map((post)=>(
                        <div key={post.id} className="border p-4 rounded shadow flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => setSelectedPost(post)}>
                            <div>
                                <div>{post.title}</div>
                                <div className="text-sm text-gray-500">작성자: {post.writerName}</div>
                            </div>
                                {/*  버튼 클릭 시 모달 열리지 않게 이벤트 전파 차단 */}
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
                    <div>게시물 없다</div>
                )}
            </div>

            {/* 모달 팝업 */}
            {selectedPost && (
                // 배경 클릭 시 모달 닫기
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedPost(null)} >
                    {/* // 모달 내부 클릭 시 닫히지 않게 */}
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()} >
                        {/* 모달 헤더 */}
                        <div className="flex justify-between items-center mb-4 border-b pb-3">
                            <h2 className="text-xl font-bold">{selectedPost.title}</h2>
                            <button onClick={() => setSelectedPost(null)}  className="text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none">
                                &times;
                            </button>
                        </div>

                        {/* 작성자 정보 */}
                        <div className="text-sm text-gray-500 mb-4">
                            작성자: {selectedPost.writerName}
                        </div>

                        {/* 게시글 내용 */}
                        <div className="text-gray-700 whitespace-pre-wrap min-h-[100px]">
                            {selectedPost.content}
                        </div>

                        {/* 모달 하단 버튼 */}
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
                            <button onClick={() => setSelectedPost(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
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