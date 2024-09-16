import React, { useState } from 'react';

const Login = ({ onSwitchToSignUp }) => {
    const [loginValues, setLoginValues] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className='flex items-center justify-center w-full  p-6'>
            <div className='flex flex-col w-full max-w-md p-6 bg-white rounded-lg'>
                {/* Adjust image styling if needed */}
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-900'>
                    Welcome Back! to SHIM SERVICES
                </h2>
                <form className='flex flex-col gap-4'>
                    <input 
                        type="email" 
                        name="email"
                        value={loginValues.email}
                        onChange={handleInputChange}
                        placeholder="Email" 
                        className="p-3 border border-gray-300 rounded text-sm" 
                    />
                    <input 
                        type="password" 
                        name="password"
                        value={loginValues.password}
                        onChange={handleInputChange}
                        placeholder="Password" 
                        className="p-3 border border-gray-300 rounded text-sm" 
                    />
                    <button className='bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm'>
                        Login
                    </button>
                    <p className='mt-4 text-sm text-center text-gray-700'>
                        Don't have an account? 
                        <span onClick={onSwitchToSignUp} className='text-blue-600 cursor-pointer'> Sign Up</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
