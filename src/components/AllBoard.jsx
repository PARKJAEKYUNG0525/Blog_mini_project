import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContextPro';

const AllBoard = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { currentUser } = useAuth();

    const POSTS_PER_PAGE = 4;

    // Calculate top 5 most viewed posts
    const topViewPosts = useMemo(() => {
        return [...posts]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5);
    }, [posts]);

    // Calculate statistics
    const stats = useMemo(() => {
        const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
        const writerCount = new Set(posts.map((p) => p.writerId)).size;
        const topPost = posts.reduce((top, p) => (!top || (p.views || 0) > (top.views || 0) ? p : top), null);

        // Posts per writer
        const writerMap = {};
        posts.forEach((p) => {
            const name = p.writerName || p.writerId;
            writerMap[name] = (writerMap[name] || 0) + 1;
        });
        const writerStats = Object.entries(writerMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        return { totalViews, writerCount, topPost, writerStats };
    }, [posts]);

    // Recent activity (latest 4 posts)
    const recentActivity = useMemo(() => {
        return [...posts]
            .sort((a, b) => (b.createdAt || b.id) - (a.createdAt || a.id))
            .slice(0, 4);
    }, [posts]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);
    }, []);

    const handleDelete = (id) => {
        const updated = posts.filter((post) => post.id !== id);
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));
        setSelectedPost(null);
    };

    const isAdmin = currentUser?.userId === 'admin';

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.writerName.toLowerCase().includes(search.toLowerCase())
    );

    const canEdit = (post) => currentUser?.userId === post.writerId;
    const canDelete = (post) => currentUser && (currentUser.userId === post.writerId || isAdmin);

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleSelectPost = (post) => {
        const updated = posts.map((p) =>
            p.id === post.id ? { ...p, views: p.views + 1 } : p
        );
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));
        setSelectedPost(post);
    };

    const getInitials = (name = '') => name.slice(0, 2);

    const avatarColors = [
        { bg: 'bg-blue-100', text: 'text-blue-700' },
        { bg: 'bg-gray-100', text: 'text-gray-600' },
        { bg: 'bg-emerald-100', text: 'text-emerald-700' },
        { bg: 'bg-purple-100', text: 'text-purple-700' },
        { bg: 'bg-amber-100', text: 'text-amber-700' },
    ];
    
    const writerColorMap = useMemo(() => {
        const map = {};
        let idx = 0;
        posts.forEach((p) => {
            if (!map[p.writerName]) {
                map[p.writerName] = avatarColors[idx % avatarColors.length];
                idx++;
            }
        });
        return map;
    }, [posts]);

    const maxWriterCount = stats.writerStats[0]?.[1] || 1;

    return (
        <div className="flex flex-col justify-start items-center pt-16 min-h-screen bg-gray-50 px-4 pb-16">
            <div className="flex w-full max-w-[1200px] gap-6">

                {/* Left: Popular Posts (1/3) */}
                <div className="w-1/3 bg-white p-6 rounded-2xl self-start">
                    <h1 className="text-xl font-bold text-gray-800">Popular Posts</h1><br />
                    <ul className="bg-gray-50 rounded-xl p-3 space-y-2">
                        {topViewPosts.length > 0 ? (
                            topViewPosts.map((post) => (
                                <li
                                    key={post.id}
                                    className="flex justify-between items-center p-2 bg-white rounded hover:bg-blue-50 cursor-pointer"
                                    onClick={() => handleSelectPost(post)}
                                >
                                    <span className="truncate">{post.title}</span>
                                    <span className="text-xs text-gray-400 ml-2">Views: {post.views || 0}</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 text-sm text-center">No posts found.</li>
                        )}
                    </ul>
                </div>

                {/* Right: All Posts + Search (2/3) */}
                <div className="w-2/3 bg-white p-6 rounded-2xl flex flex-col h-[500px]">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold text-gray-800">All Posts</h1>
                        <span className="text-xs text-gray-400">Total: {filteredPosts.length}</span>
                    </div>

                    <input
                        type="text"
                        placeholder="Search by title or writer..."
                        value={search}
                        onChange={handleSearchChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />

                    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg mb-1 text-xs font-bold text-gray-500 uppercase tracking-wide">
                        <span className="w-1/2 text-center">Title</span>
                        <span className="w-1/4 text-center">Writer</span>
                        {isAdmin && <span className="w-1/4 text-center">Manage</span>}
                    </div>

                    <ul className="flex-1 overflow-y-auto">
                        {paginatedPosts.length > 0 ? (
                            paginatedPosts.map((post) => (
                                <li
                                    key={post.id}
                                    className="flex items-center border-b border-gray-50 px-3 py-2.5 text-sm hover:bg-gray-50 rounded transition-colors"
                                >
                                    <span
                                        className="w-1/2 text-center font-medium text-black-700 cursor-pointer hover:text-blue-500 transition-colors truncate px-2"
                                        onClick={() => handleSelectPost(post)}
                                    >
                                        {post.title}
                                    </span>
                                    <span className="w-1/4 text-center text-black-500" onClick={() => handleSelectPost(post)}>
                                        {post.writerName}
                                    </span>
                                    <span className="w-1/4 text-center flex justify-center gap-2">
                                        {canEdit(post) && (
                                            <Link
                                                to={`/board/edit/${post.id}`}
                                                className="bg-gray-900 text-white text-[11px] px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-gray-800 transition-all active:scale-95 font-medium inline-block"
                                            >
                                                Edit
                                            </Link>
                                        )}
                                        {canDelete(post) && (
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="bg-gray-100 text-gray-500 text-[11px] px-3.5 py-1.5 rounded-lg hover:bg-gray-200 hover:text-gray-700 transition-all active:scale-95 font-medium"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="text-center text-gray-300 py-10 text-sm">No search results found.</li>
                        )}
                    </ul>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-1 pt-4 mt-2 border-t border-gray-50">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                ‹
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors font-medium
                                        ${currentPage === page
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-400 hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                ›
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Statistics Section */}
            {posts.length > 0 && (
                <div className="w-full max-w-[1200px] mt-6 flex flex-col gap-4">

                    {/* 4 Stats Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { label: 'Total Posts', value: posts.length, sub: 'Cumulative' },
                            { label: 'Total Views', value: stats.totalViews, sub: 'All posts combined' },
                            { label: 'Authors', value: stats.writerCount, sub: 'Users' },
                            { label: 'Most Popular', value: stats.topPost?.title || '-', sub: `Views: ${stats.topPost?.views || 0}`, isText: true },
                        ].map((card) => (
                            <div key={card.label} className="bg-white rounded-2xl p-5">
                                <p className="text-xs text-gray-400 mb-1">{card.label}</p>
                                <p className={`font-semibold text-gray-800 ${card.isText ? 'text-base mt-1' : 'text-2xl'}`}>
                                    {card.value}
                                </p>
                                <p className="text-xs text-gray-300 mt-1">{card.sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Posts by Author */}
                        <div className="bg-white rounded-2xl p-5">
                            <h2 className="text-sm font-semibold text-gray-700 mb-4">Posts by Author</h2>
                            <div className="space-y-3">
                                {stats.writerStats.map(([name, count]) => (
                                    <div key={name} className="flex items-center gap-3">
                                        <span className="text-xs text-gray-400 w-16 text-right shrink-0">{name}</span>
                                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gray-800 rounded-full transition-all"
                                                style={{ width: `${(count / maxWriterCount) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-300 w-4 text-right">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl p-5">
                            <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent Activity</h2>
                            <ul className="space-y-3">
                                {recentActivity.map((post) => {
                                    const color = writerColorMap[post.writerName] || avatarColors[0];
                                    return (
                                        <li
                                            key={post.id}
                                            className="flex items-center gap-3 cursor-pointer group"
                                            onClick={() => handleSelectPost(post)}
                                        >
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${color.bg} ${color.text}`}>
                                                {getInitials(post.writerName)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-700 truncate group-hover:text-blue-500 transition-colors">
                                                    {post.title}
                                                </p>
                                                <p className="text-xs text-gray-400">{post.writerName}</p>
                                            </div>
                                            <span className="text-xs text-gray-300 shrink-0">Views {post.views || 0}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Post Detail Modal */}
            {selectedPost && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={() => setSelectedPost(null)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4 flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-base font-bold text-gray-800 truncate pr-4">{selectedPost.title}</h2>
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="text-gray-400 hover:text-gray-600 text-xl font-bold flex-shrink-0"
                            >
                                ×
                            </button>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm">
                            <span className="text-gray-400">Writer</span>
                            <span className="font-semibold text-gray-700">{selectedPost.writerName}</span>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap min-h-[120px] leading-relaxed">
                            {selectedPost.content}
                        </div>
                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                            {canEdit(selectedPost) && (
                                <Link
                                    to={`/board/edit/${selectedPost.id}`}
                                    className="bg-gray-900 text-white text-[11px] px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-gray-800 transition-all active:scale-95 font-medium inline-block"
                                >
                                    Edit
                                </Link>
                            )}
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="bg-gray-100 text-gray-600 text-[11px] px-3.5 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllBoard;