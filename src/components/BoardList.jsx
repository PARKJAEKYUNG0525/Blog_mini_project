import React from 'react';

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

    //삭제 버튼
    const handleDelete=(id)=>{
        const updated=posts.filter((post) => post.id !== id);
        setPosts(updated);

        //삭제 후 남겨진 데이터만 로컬스토리지에 저장 ..posts
        localStorage.setItem("posts", JSON.stringify(updated));

    }


    return (
        <div className="flex justify-center items-center h-screen text-3xl font-bold">
            내 게시글
        </div>
    <div className="max-w-5xl mx-auto mt-10 flex gap-10">
        <div className="w-1/4 border p-4 rounded shadow h-fit">
            <h2 className="font-bold mb-3">회원 정보</h2>
                <div>이름 : {currentUser && currentUser.name}</div>
                <div className="mb-4">생년월일 : {currentUser && currentUser.birthDate}</div>
                <Link to="/board/create" className="bg-green-500 text-white px-3 
                    py-1 rounded block text-center">글쓰기</Link>
        </div>
    

    <div className="flex-1">
    <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">게시글 목록</h1>
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
            <div>게시물 없음</div>
        )}
        <br></br><br></br>
        <hr className="my-8 border-gray-300"></hr>
        <br></br><br></br>
            <div>
                {posts.length > 0 && (posts.map((post)=>(
                    <div key={post.id} className="border p-4 rounded shadow mb-3">
                        <div className="font-bold text-lg">제목 : {post.title}</div>
                        <div className="text-gray-600 mt-2">내용 : {post.content}</div>
                    </div>
                )))}
            </div>
        </div>
    </div>
    </div>
    );
};

export default BoardList;