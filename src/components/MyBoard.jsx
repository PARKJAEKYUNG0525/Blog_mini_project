import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContextPro";

const MyBoard = () => {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useAuth();
    const navigator = useNavigate();
    const [selectPost, setSelectPost] = useState(null);
    const [sortType, setSortType] = useState("latest");

    useEffect(() => {
        if (!currentUser) {
            alert("Please login to access this page.");
            navigator('/login');
        }
    }, [currentUser, navigator]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);
    }, []);

    // Filter only my posts
    const myPosts = posts.filter((p) => currentUser && p.writerId === currentUser.userId);

    // Sorting logic
    const sortedPosts = [...myPosts].sort((a, b) => {
        if (sortType === "latest") return b.id - a.id;
        if (sortType === "oldest") return a.id - b.id;
        if (sortType === "title") return a.title.localeCompare(b.title);
        return 0;
    });

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        const updated = posts.filter((post) => post.id !== id);
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));
        if (selectPost && selectPost.id === id) setSelectPost(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">

                {/* Left: User Profile (1/3) - AllBoard's Sidebar Style */}
                <div className="w-full md:w-1/3">
                    <div className="border border-gray-100 p-8 rounded-2xl bg-white sticky top-24 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl mb-4">
                            <span className="grayscale opacity-50">👤</span>
                        </div>
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">{currentUser?.userId || "Guest"}</h2>
                            <p className="text-[11px] text-gray-400 mt-1 font-bold uppercase tracking-widest">Verified Member</p>
                        </div>

                        <div className="w-full space-y-4 border-t border-gray-50 pt-6 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Name</span>
                                <span className="font-semibold text-gray-700">{currentUser?.name || "-"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Birthday</span>
                                <span className="font-semibold text-gray-700">{currentUser?.birthDate || "-"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">My Posts</span>
                                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold text-xs">
                                    {myPosts.length} Posts
                                </span>
                            </div>
                        </div>

                        <Link to="/board/create" className="mt-8 w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-bold text-center hover:bg-gray-800 transition-all shadow-sm active:scale-95">
                            Create New Post
                        </Link>
                    </div>
                </div>

                {/* Right: My Post List (2/3) - AllBoard's List Style */}
                <div className="w-full md:w-2/3">
                    <div className="flex justify-between items-end mb-8 border-b border-gray-50 pb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Workspace</h1>
                            <p className="text-sm text-gray-400 mt-1">Manage your personal contributions</p>
                        </div>
                        
                        <select
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value)}
                            className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-500 outline-none cursor-pointer focus:ring-2 focus:ring-gray-100"
                        >
                            <option value="latest">Latest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="title">By Title</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {myPosts.length > 0 ? (
                            sortedPosts.map((post) => (
                                <div key={post.id} className="group flex flex-col">
                                    <div 
                                        onClick={() => setSelectPost(selectPost?.id === post.id ? null : post)}
                                        className={`border p-6 rounded-2xl flex justify-between items-center cursor-pointer transition-all ${
                                            selectPost?.id === post.id 
                                            ? "border-blue-100 bg-blue-50/30" 
                                            : "border-gray-50 hover:border-gray-200 hover:bg-gray-50/30 bg-white"
                                        }`}
                                    >
                                        <div className="flex flex-col gap-1 pr-4">
                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                                {new Date(post.id).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <h3 className={`text-lg font-bold transition-colors ${selectPost?.id === post.id ? "text-blue-600" : "text-gray-800"}`}>
                                                {post.title}
                                            </h3>
                                        </div>

                                        <div className="flex gap-4 items-center" onClick={(e) => e.stopPropagation()}>
                                            <Link to={`/board/edit/${post.id}`} className="bg-gray-900 text-white text-[11px] px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-gray-800 transition-all active:scale-95 font-medium inline-block">Edit</Link>
                                            <button onClick={() => handleDelete(post.id)} className="bg-gray-100 text-gray-500 text-[11px] px-3.5 py-1.5 rounded-lg hover:bg-gray-200 hover:text-gray-700 transition-all active:scale-95 font-medium">Delete</button>
                                        </div>
                                    </div>

                                    {/* Expandable Content Area */}
                                    {selectPost?.id === post.id && (
                                        <div className="mx-2 p-8 bg-white border-x border-b border-blue-50 rounded-b-2xl shadow-sm animate-fadeIn">
                                            <div className="text-[10px] font-bold text-blue-400 mb-4 uppercase tracking-widest">Post Content</div>
                                            <p className="text-gray-600 text-base leading-relaxed whitespace-pre-wrap">
                                                {post.content}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="py-24 text-center text-gray-300 italic border border-dashed border-gray-100 rounded-3xl font-medium">
                                You haven't shared anything yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBoard;