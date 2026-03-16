import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {

    const [posts, setPosts]=useState([]);
    const [currentUser, setCurrentUser]=useState(null);

    useEffect(()=>{
        //posts 가져오고, currentUser도 가져온다..
        const storedPosts=JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);

        const storedUser=JSON.parse(localStorage.getItem("currentUser")) || [];
        setCurrentUser(storedUser);

    },[])


    const handleDelete=(id)=>{
        const updated=posts.filter((post) => post.id !== id);
        setPosts(updated);

        //삭제 후 남겨진 데이터만 로컬스토리지에 저장 ..posts
        localStorage.setItem("posts", JSON.stringify(updated));

    }

    return (
      <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">게시글 목록</h1>
            <Link to="/board/create"  className="bg-green-500 text-white px-3 py-1 rounded">글쓰기</Link>
            </div>
      
      <div className="space-y-3">
        {posts.length > 0 ? (
            posts.map((post)=>(
                <div key={post.id} className="border p-4 rounded shadow flex justify-between">
                    <div>{post.title}</div>
                
                {currentUser && currentUser.userId === post.writerId && (
                     <div className="flex gap-3">
                    
                        <Link to={`/board/edit/${post.id}`} className="text-blue-500">수정</Link>

                  
                        <button onClick={()=> handleDelete(post.id)} className="text-red-500">삭제</button>
                    </div>
                )}
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