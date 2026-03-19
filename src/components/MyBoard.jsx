import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContextPro";
import { Link } from "react-router-dom";

const MyBoard = () => {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useAuth();
    const navigator = useNavigate();
    const [selectPost, setSelectPost] = useState(null);

    if (!currentUser) {
        alert("로그인이 필요합니다.");
        navigator('/login');
    }

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);
    }, []);

    const myPosts = posts.filter((p) => currentUser && p.writerId === currentUser.userId);

    const handleDelete = (id) => {
        const updated = posts.filter((post) => post.id !== id);
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));

        if (selectPost && selectPost.id === id) {
            setSelectPost(null);
        }
    };

    return (
        <div className="flex justify-center items-start pt-16 min-h-screen bg-gray-100">

            {/* 좌측 회원 정보*/}
            <div className="w-64 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">                    
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                        👤
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-lg text-gray-800">{currentUser && currentUser.userId ? currentUser.userId : "-"}</div>
                        <div className="text-xs text-gray-400 mt-1">회원</div>
                    </div>

                    <div className="w-full h-px bg-gray-100" />

                    <div className="w-full text-sm space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-400">이름</span>
                            <span className="font-medium text-gray-700">{currentUser && currentUser.name ? currentUser.name : "-"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">생년월일</span>
                            <span className="font-medium text-gray-700">{currentUser && currentUser.birthDate ? currentUser.birthDate : "-"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">게시글</span>
                            <span className="font-semibold text-blue-500">{myPosts.length}개</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 우측 게시글 목록 */}
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg flex flex-col">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-xl font-bold text-gray-800">내 게시글</h1>
                    <Link to="/board/create" className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">글쓰기</Link>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[60vh]">
                    {myPosts.length > 0 ? (
                        myPosts.map((post) => (
                            <div>
                                <div key={post.id}                                
                                        onClick={() => {
                                            if (selectPost && selectPost.id === post.id){
                                                setSelectPost(null);
                                            }
                                            else{
                                                setSelectPost(post)
                                            }
                                        }}   
                                        className={`border p-4 rounded shadow flex justify-between items-center cursor-pointer bg-white ${
                                            selectPost && selectPost.id === post.id ? "bg-green-500" : ""
                                        }`}
                                    >                             
                                    <div>
                                        <div className="font-bold">{post.title}</div>
                                        <div className="text-sm text-gray-500">
                                            작성자: {post.writerName}
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-center min-w-[110px] justify-end">
                                        <Link to={`/board/edit/${post.id}`} className="text-blue-500">수정</Link>
                                        <button onClick={(e) => {e.stopPropagation(); handleDelete(post.id);}} className="text-red-500">삭제</button>
                                    </div>
                                    
                                </div>

                                {/* 아래 게시글 */}
                                {selectPost && selectPost.id === post.id && (
                                <div className="border-l-4 border-green-500 bg-green-50 p-4 mt-2 rounded">
                                    <h2 className="text-lg font-bold mb-2">제목 : {post.title}</h2>
                                    <p>내용 : {post.content}</p>
                                </div>
                                )}

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