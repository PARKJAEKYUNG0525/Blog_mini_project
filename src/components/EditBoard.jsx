import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditBoard = () => {
    // URL에서 해당 게시글의 id를 가져옵니다.
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [post, setPost] = useState({ title: "", content: "" });

    useEffect(() => {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        // id 타입 일치를 위해 parseInt 사용
        const currentPost = posts.find((p) => p.id === parseInt(id));

        if (currentPost) {
            setPost(currentPost);
        } else {
            alert("Post not found.");
            navigate('/myBoard');
        }
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!post.title.trim() || !post.content.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        // 기존 데이터(writerId, views 등)를 보존하면서 title과 content만 업데이트
        posts = posts.map((p) => 
            p.id === parseInt(id) ? { ...p, title: post.title, content: post.content } : p
        );

        localStorage.setItem("posts", JSON.stringify(posts));
        
        // 수정 완료 후 MyBoard로 이동
        navigate('/myBoard');
    };

    return (
        <div className="flex justify-center items-start pt-20 min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-[800px]">
                
                {/* Header Section */}
                <div className="mb-8 flex justify-between items-end px-2">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
                        <p className="text-sm text-gray-400 mt-1">Update your content for the community</p>
                    </div>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                        Author Mode
                    </span>
                </div>

                {/* Edit Form Card */}
                <div className="bg-white rounded-3xl shadow-sm p-10 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* Title Input */}
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                                Discussion Title
                            </label>
                            <input 
                                className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-gray-800 focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-semibold text-lg"
                                value={post.title} 
                                placeholder="Enter post title..."
                                onChange={(e) => setPost({ ...post, title: e.target.value })}
                            />
                        </div>

                        {/* Content Textarea */}
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                                Post Content
                            </label>
                            <textarea 
                                className="w-full bg-gray-50 border border-transparent rounded-3xl px-6 py-5 text-gray-800 focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none h-80 resize-none leading-relaxed text-base"
                                value={post.content} 
                                placeholder="Share your thoughts..."
                                onChange={(e) => setPost({ ...post, content: e.target.value })}
                            ></textarea>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50">
                            <button 
                                type="button"
                                onClick={() => navigate(-1)}
                                className="bg-gray-100 text-gray-500 px-8 py-3 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                className="bg-gray-900 text-white px-10 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Tip */}
                <p className="text-center text-gray-300 text-xs mt-8">
                    Tip: Your changes will be immediately visible in the community feed.
                </p>
            </div>
        </div>
    );
};

export default EditBoard;