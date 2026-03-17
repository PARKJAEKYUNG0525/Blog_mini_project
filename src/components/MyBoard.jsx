import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContextPro";
import { Link } from "react-router-dom";

const MyBoard = () => {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useAuth();
    const navigator = useNavigate();

    if(!currentUser){
        alert("로그인이 필요합니다.");
        navigator('/login');
    }

    useEffect(()=>{
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);
    },[]);


    // 현재 로그인 된 사용자 글만 필터링
                                                    // currentUser ? currentUser.userId : null
    const myPosts = posts.filter((p) => p.writerId === currentUser?.userId);

    const handleDelete = (id) => {
        const updated = posts.filter((post) => post.id !== id);
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));
    };

    return (
    <div className="max-w-3xl mx-auto mt-10">
        <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">내 게시글</h1>
            <Link to="/board/create" className="bg-green-500 text-white px-3 py-1 rounded">글쓰기</Link>
        </div>

      <div className="space-y-3">
        {myPosts.length > 0 ? (
          myPosts.map((post) => (
            <div key={post.id} className="border p-4 rounded shadow flex justify-between items-center">
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
          <div>내가 쓴 게시글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MyBoard;