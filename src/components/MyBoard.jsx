import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContextPro";
import { Link } from "react-router-dom";

const MyBoard = () => {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useAuth();
    const navigator = useNavigate();
    const [selectPost, setSelectPost] = useState(null);
    const [sortType, setSortType] = useState("latest");

    useEffect(() => {
        if (!currentUser) {
            alert("로그인이 필요합니다.");
            navigator('/login');
        }
    }, [currentUser]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);
    }, []);

    // 내 게시글만 보이게
    const myPosts = posts.filter((p) => currentUser && p.writerId === currentUser.userId);

    // 게시글 정렬
    const sortedPosts = [...myPosts].sort((a, b) => {
        if (sortType === "latest") {  // 최신순
            return b.id - a.id; 
        } else if (sortType === "oldest"){  // 오래된순
            return a.id - b.id; 
        } else if (sortType === "title") {  // 제목순
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    // 조회수 증가
    const handleSelectPost = (post) => {
        const updated = posts.map((p) => 
            p.id === post.id ? { ...p, views: p.views + 1 } : p
        );
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));

        setSelectPost(post);
    };

    const handleDelete = (id) => {
        const updated = posts.filter((post) => post.id !== id);
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));

        if (selectPost && selectPost.id === id) {
            setSelectPost(null);
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 flex gap-8">

            {/* 좌측 회원 정보*/}
            <div className="w-64 flex-shrink-0">
                <div className="border rounded-xl shadow p-5 flex flex-col items-center gap-3 bg-white">                    
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
                        👤
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-lg">{currentUser && currentUser.userId ? currentUser.userId : "-"}</div>
                        <div className="text-xs text-gray-400 mt-1">회원</div>
                    </div>
                    <hr className="w-full border-gray-200" />
                    <div className="w-full text-sm space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-500">이름</span>
                            <span className="font-medium">{currentUser && currentUser.name ? currentUser.name : "-"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">생년월일</span>
                            <span className="font-medium">{currentUser && currentUser.birthDate ? currentUser.birthDate : "-"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">게시글</span>
                            <span className="font-medium text-green-600">{myPosts.length}개</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 우측 게시글 목록 */}
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">내 게시글</h1>
                    <div className="flex gap-2">
                        <select
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value)}
                            className="border rounded px-2 py-1 text-sm"
                        >
                            <option value="latest">최신순</option>
                            <option value="oldest">오래된순</option>
                            <option value="title">제목순</option>
                        </select>

                        <Link to="/board/create" className="bg-green-500 text-white px-3 py-1 rounded">글쓰기</Link>
                    </div>


                </div>

                <div className="space-y-3 overflow-y-auto max-h-[60vh]">
                    {myPosts.length > 0 ? (
                        sortedPosts.map((post) => (
                            <div key={post.id}>
                                <div                               
                                        onClick={() => handleSelectPost(post)}
                                        className={`border p-4 rounded shadow flex justify-between items-center cursor-pointer bg-white ${
                                            selectPost && selectPost.id === post.id ? "bg-green-500" : ""
                                        }`}
                                    >                             
                                    <div className="flex justify-between items-start w-full">
                                        {/* 왼쪽: 제목 + 작성자 */}
                                        <div>
                                            <div className="font-bold">{post.title}</div>
                                            <div className="text-sm text-gray-500">
                                                작성자: {post.writerName}
                                            </div>
                                        </div>

                                        {/* 오른쪽: 날짜 */}
                                        <div className="text-xs text-gray-400 whitespace-nowrap ml-4">
                                            {new Date(post.id).toLocaleString('ko-KR')}
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