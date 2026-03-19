import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (userId.length < 4) {
      newErrors.userId = 'ID must be at least 4 characters.';
    } else if (users.some(user => user.userId === userId)) {
      newErrors.userId = 'This ID is already taken.';
    }

    if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (name.trim().length < 2) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!birthDate) {
      newErrors.birthDate = 'Birth date is required.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newUser = { userId, password, name, birthDate };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    navigate('/login');
  };

  const inputStyle = (error) => `
    w-full bg-gray-50 border border-transparent rounded-2xl px-5 py-3.5 
    text-gray-800 focus:bg-white focus:border-blue-100 focus:ring-4 
    focus:ring-blue-50/50 transition-all outline-none font-semibold text-sm
    ${error ? 'border-red-200 bg-red-50/30' : ''}
  `;

  const labelStyle = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-full max-w-[450px]">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h1>
          <p className="text-sm text-gray-400 mt-2 font-medium uppercase tracking-widest text-[10px]">
            Join our creative community
          </p>
        </div>

        {/* Card Section */}
        <div className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* User ID */}
            <div>
              <label className={labelStyle}>User Identifier</label>
              <input 
                className={inputStyle(errors.userId)}
                type='text' placeholder="Min. 4 characters"
                value={userId} 
                onChange={(e) => {setUserId(e.target.value); setErrors(p => ({...p, userId:''}))}}
              />
              {errors.userId && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-bold">{errors.userId}</p>}
            </div>

            {/* Password Group */}
            <div className="rounded-[32px] gap-4">
              <div>
                <label className={labelStyle}>Password</label>
                <input 
                  className={inputStyle(errors.password)}
                  type='password' placeholder="••••••••"
                  value={password} 
                  onChange={(e) => {setPassword(e.target.value); setErrors(p => ({...p, password:''}))}}
                />
                {errors.password && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-bold">{errors.password}</p>}
              </div>
              <br></br>
              <div>
                <label className={labelStyle}>Confirm</label>
                <input 
                  className={inputStyle(errors.confirmPassword)}
                  type='password' placeholder="••••••••"
                  value={confirmPassword} 
                  onChange={(e) => {setConfirmPassword(e.target.value); setErrors(p => ({...p, confirmPassword:''}))}}
                />
              </div>
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-[10px] -mt-3 ml-1 font-bold">{errors.confirmPassword}</p>}

            {/* Name */}
            <div>
              <label className={labelStyle}>Full Name</label>
              <input 
                className={inputStyle(errors.name)}
                type='text' placeholder="Your name"
                value={name} 
                onChange={(e) => {setName(e.target.value); setErrors(p => ({...p, name:''}))}}
              />
              {errors.name && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-bold">{errors.name}</p>}
            </div>

            {/* Birth Date */}
            <div>
              <label className={labelStyle}>Date of Birth</label>
              <input 
                className={inputStyle(errors.birthDate)}
                type='date' 
                value={birthDate} 
                onChange={(e) => {setBirthDate(e.target.value); setErrors(p => ({...p, birthDate:''}))}}
              />
              
              {errors.birthDate && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-bold">{errors.birthDate}</p>}
            </div>

            {/* Action Button */}
            <button className="w-full bg-gray-900 text-white py-4 rounded-2xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-100 active:scale-[0.98] mt-4">
              Register Now
            </button>
          </form>

          {/* Bottom Link */}
          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <p className="text-xs text-gray-400 font-medium">
              Already a member?{' '}
              <Link to="/login" className="text-blue-500 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;