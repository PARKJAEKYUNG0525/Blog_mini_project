import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContextPro';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Access Auth Context
    const { setCurrentUser } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const loginUser = users.find((user) => user.userId === userId && user.password === password);

        if (loginUser) {
            // Update Context and Persistence
            setCurrentUser(loginUser);
            localStorage.setItem("currentUser", JSON.stringify(loginUser));

            setUserId("");
            setPassword("");
            navigate('/');
        } else {
            alert('Invalid ID or Password. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50 px-4">
            <div className="w-full max-w-[400px]">
                
                {/* Brand Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
                    <p className="text-sm text-gray-400 mt-2 font-medium uppercase tracking-widest text-[10px]">
                        Sign in to your account
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        
                        {/* ID Field */}
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                User Identifier
                            </label>
                            <input 
                                className="w-full bg-gray-50 border border-transparent rounded-2xl px-5 py-4 text-gray-800 focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-semibold"
                                type='text' 
                                placeholder="Enter your ID"
                                value={userId} 
                                onChange={(e) => setUserId(e.target.value)} 
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                Secure Password
                            </label>
                            <input 
                                className="w-full bg-gray-50 border border-transparent rounded-2xl px-5 py-4 text-gray-800 focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-semibold"
                                type='password' 
                                placeholder="••••••••"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button className="w-full bg-gray-900 text-white py-4 rounded-2xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-[0.98] mt-4">
                            Sign In
                        </button>
                    </form>

                    {/* Footer Actions */}
                    <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                        <p className="text-xs text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/join" className="text-blue-500 font-bold hover:underline">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom Decorative Text */}
                <p className="text-center text-gray-300 text-[10px] mt-8 uppercase tracking-tighter">
                    © 2026 Your Studio. All Rights Reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;