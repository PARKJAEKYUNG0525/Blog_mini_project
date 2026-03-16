import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditBoard = () => {

    //board/edit/${post.id} 해당하는 id가져옴
    const {id} =useParams();

    const [post, setPost]=useState({title:"", content:""});
    const navigator=useNavigate();

    useEffect(()=>{

        const posts=JSON.parse(localStorage.getItem("posts")) || [];

        const currentPost=posts.find((p)=> parseInt(id) === p.id);

        if(currentPost){
            setPost(currentPost);
        }

    },[id]);

    const onSubmit1=(e)=>{
        e.preventDefault();

        let posts=JSON.parse(localStorage.getItem("posts")) || [];

        posts=posts.map((p) => p.id === parseInt(id) ? {...post, writerId: p.writerId} : p);

        //수정된 값 다시 로컬스토리지에 저장
        localStorage.setItem("posts", JSON.stringify(posts));

        //boardList로 이동
        navigator('/boardList');

    }
   

    return (
       <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">게시글 수정</h1>
            <form onSubmit={onSubmit1}>
                <input className="border w-full p-2 mb-3 rounded" value={post.title} onChange={(e)=>setPost({...post, title:e.target.value})}></input>
                <textarea className="border w-full p-2 mb-3 rounded h-40" value={post.content} onChange={(e)=>setPost({...post, content:e.target.value})}></textarea>

                <button className="bg-green-500 text-white px-4 py-2 rounded">수정</button>

            </form>

            
        </div>
    );
};

export default EditBoard;