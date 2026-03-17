import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {

    const [posts, setPosts]=useState([]);
    const [currentUser, setCurrentUser]=useState(null);

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
    }

    // 관리자 여부 체크
    const isAdmin = currentUser?.userId === 'admin';  // ← 추가

    return (
      <div className="max-w-3xl mx-auto mt-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">게시글 목록</h1>
          <Link to="/board/create" className="bg-green-500 text-white px-3 py-1 rounded">글쓰기</Link>
        </div>
      
        <div className="space-y-3">
          {posts.length > 0 ? (
            posts.map((post)=>(
              <div key={post.id} className="border p-4 rounded shadow flex justify-between items-center">
                <div>
                  <div>{post.title}</div>
                  <div className="text-sm text-gray-500">작성자: {post.writerName}</div>
                </div>
              
                <div className="flex gap-3">
                  {/* 본인 글이면 수정/삭제 */}
                  {currentUser && currentUser.userId === post.writerId && (
                    <>
                      <Link to={`/board/edit/${post.id}`} className="text-blue-500">수정</Link>
                      <button onClick={()=> handleDelete(post.id)} className="text-red-500">삭제</button>
                    </>
                  )}
                  {/* 관리자면 삭제만 */}
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
      </div>
    );
};
export default BoardList;