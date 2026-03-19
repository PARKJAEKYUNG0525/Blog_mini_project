import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContextPro';

const CreateBoard = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    // Ensure user is logged in
    useEffect(() => {
        if (!currentUser) {
            alert("Please login to create a post.");
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("Please fill in both title and content.");
            return;
        }

        const posts = JSON.parse(localStorage.getItem("posts")) || [];

        const newPost = {
            id: Date.now(),
            title,
            content,
            writerId: currentUser.userId,
            writerName: currentUser.name,
            views: 0,
        };

        posts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(posts));

        setTitle("");
        setContent("");
        navigate('/myBoard');
    };

    return (
        <div className="flex justify-center items-start pt-20 min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-[800px]">
                
                {/* Header Section */}
                <div className="mb-8 flex justify-between items-end px-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Create Post</h1>
                        <p className="text-sm text-gray-400 mt-1">Share your thoughts with the community</p>
                    </div>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                        New Draft
                    </span>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl shadow-sm p-10 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* Title Input */}
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                                Post Title
                            </label>
                            <input 
                                type="text"
                                className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-gray-800 focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-semibold text-lg placeholder:text-gray-300"
                                value={title} 
                                placeholder="Enter a catchy title..."
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Content Textarea */}
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                                Content Description
                            </label>
                            <textarea 
                                className="w-full bg-gray-50 border border-transparent rounded-3xl px-6 py-5 text-gray-800 focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none h-80 resize-none leading-relaxed text-base placeholder:text-gray-300"
                                value={content} 
                                placeholder="What's on your mind?"
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50">
                            <button 
                                type="button"
                                onClick={() => navigate(-1)}
                                className="bg-gray-100 text-gray-500 px-8 py-3 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all active:scale-95"
                            >
                                Back
                            </button>
                            <button 
                                type="submit"
                                className="bg-gray-900 text-white px-10 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95"
                            >
                                Publish Post
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Note */}
                <p className="text-center text-gray-300 text-[11px] mt-8 uppercase tracking-widest font-medium">
                    Please follow the community guidelines before posting.
                </p>
            </div>
        </div>
    );
};

export default CreateBoard;