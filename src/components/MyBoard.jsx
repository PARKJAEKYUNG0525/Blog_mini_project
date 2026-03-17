import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContextPro";
import { Link } from "react-router-dom";

const MyBoard = () => {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useAuth();
    const navigator = useNavigate();

    if (!currentUser) {
        alert("로그인이 필요합니다.");
        navigator('/login');
    }

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);
    }, []);

    const myPosts = posts.filter((p) => p.writerId === currentUser?.userId);

    const handleDelete = (id) => {
        const updated = posts.filter((post) => post.id !== id);
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 flex gap-6">

            {/* 좌측 회원 정보 패널 */}
            <div className="w-56 shrink-0">
                <div className="border rounded-xl shadow p-5 flex flex-col items-center gap-3 bg-white">
                    {/* 프로필 아이콘 */}
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
                        👤
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-lg">{currentUser?.userName ?? "-"}</div>
                        <div className="text-xs text-gray-400 mt-1">회원</div>
                    </div>
                    <hr className="w-full border-gray-200" />
                    <div className="w-full text-sm space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-500">이름</span>
                            <span className="font-medium">{currentUser?.userName ?? "-"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">생년월일</span>
                            <span className="font-medium">{currentUser?.birthDate ?? "-"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">게시글</span>
                            <span className="font-medium text-green-600">{myPosts.length}개</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 우측 게시글 목록 */}
            <div className="flex-1">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">내 게시글</h1>
                    <Link to="/board/create" className="bg-green-500 text-white px-3 py-1 rounded">글쓰기</Link>
                </div>

                <div className="space-y-3">
                    {myPosts.length > 0 ? (
                        myPosts.map((post) => (
                            <div key={post.id} className="border p-4 rounded shadow flex justify-between items-center bg-white">
                                <div>
                                    <div className="font-bold">{post.title}</div>
                                    <div className="text-sm text-gray-500">
                                        작성자: {post.writerName}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Link to={`/board/edit/${post.id}`} className="text-blue-500">수정</Link>
                                    <button onClick={() => handleDelete(post.id)} className="text-red-500">삭제</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm mt-4">내가 쓴 게시글이 없습니다.</div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MyBoard;