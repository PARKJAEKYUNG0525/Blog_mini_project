import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBoard = () => {
    //제목 상태 초기화
    const [title, setTitle]=useState('');
    //내용 상태 초기화
    const [content, setContent]=useState('');

    //네비게이트
    const navigator=useNavigate();
    
    //login.jsx 에서 저장한 로그인한 사용자 정보 가져온다.
    const currentUser=JSON.parse(localStorage.getItem("currentUser"));

    //currentUser 가 false면 alert, 로그인 창 이동
    useEffect(()=>{
        if(!currentUser){
            alert("로그인 필요하다");
            navigator('/login');
        }
    },[]);

    //onSubmit1 구현 -> 새로고침 방지
    const onSubmit1=(e)=>{
        e.preventDefault();

    //로컬스토리지에서 내가 쓴 제목과 내용을 읽어와서 posts에 저장(key : posts)
    let posts=JSON.parse(localStorage.getItem("posts")) || [];

    //현재 로그인한 사용자 아이디 추가해서 배열에 삽입
    const newPost={
        id:Date.now(),
        title,
        content,
        writerId:currentUser.userId,
    }

    posts.push(newPost);

    //로컬스토리지에 내가 쓴 제목과 내용을 저장 (key : posts) 
    localStorage.setItem("posts", JSON.stringify(posts));

    setTitle("");
    setContent("");

    navigator('/boardList');

    };

    return (
         <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">게시글 작성</h1>
            <form onSubmit={onSubmit1}>
                제목 : <input type='text' className="border w-full p-2 mb-3 rounded" value={title} onChange={(e)=>setTitle(e.target.value)} />
                내용 : <textarea  className="border w-full p-2 mb-3 rounded h-40" value={content} onChange={(e)=>setContent(e.target.value)} />
                
                <button className="bg-blue-500 text-white px-4 py-2 rounded">작성 완료</button>
            </form>
        </div>
    );
};

export default CreateBoard;