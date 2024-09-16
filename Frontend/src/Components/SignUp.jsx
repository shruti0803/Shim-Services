import React, { useState } from 'react';
import Option from './Option'; // Import the Options component

const SignUp = ({ onSwitchToLogin }) => {
    const [signupValues, setSignupValues] = useState({ email: '', username: '', city: '', password: '', confirmPassword: '', phone: '' });
    const [showOptions, setShowOptions] = useState(false); // State for showing Options dialog

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSignUp = () => {
        setShowOptions(true); // Show the Options dialog on Sign Up
    };

    const closeOptions = () => {
        setShowOptions(false); // Close the Options dialog
    };

    return (
        <div className='flex items-center justify-center w-full p-6'>
            <div className='flex flex-col w-full max-w-md bg-white rounded-lg'>
                <h2 className='text-2xl font-bold mb-2 text-center text-gray-900'>
                    Create Account
                </h2>
                <form className='flex flex-col gap-2'>
                    <input 
                        type="email" 
                        name="email"
                        value={signupValues.email}
                        onChange={handleInputChange}
                        placeholder="Email" 
                        className="p-3 border border-gray-300 rounded text-sm w-full" 
                    />
                    <input 
                        type="text" 
                        name="username"
                        value={signupValues.username}
                        onChange={handleInputChange}
                        placeholder="Username" 
                        className="p-3 border border-gray-300 rounded text-sm w-full" 
                    />
                    {/* <input 
                        type="text" 
                        name="city"
                        value={signupValues.city}
                        onChange={handleInputChange}
                        placeholder="City" 
                        className="p-3 border border-gray-300 rounded text-sm w-full" 
                    /> */}
                    <input 
                        type="password" 
                        name="password"
                        value={signupValues.password}
                        onChange={handleInputChange}
                        placeholder="Create Password" 
                        className="p-3 border border-gray-300 rounded text-sm w-full" 
                    />
                    <input 
                        type="password" 
                        name="confirmPassword"
                        value={signupValues.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password" 
                        className="p-3 border border-gray-300 rounded text-sm w-full" 
                    />
                    <input 
                        type="text" 
                        name="phone"
                        value={signupValues.phone}
                        onChange={handleInputChange}
                        placeholder="Phone No." 
                        className="p-3 border border-gray-300 rounded text-sm w-full" 
                    />
                    <button 
                        type='button'
                        onClick={handleSignUp}
                        className='bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm w-full'
                    >
                        Sign Up
                    </button>
                    <p className='mt-4 text-sm text-center text-gray-700'>
                        Already have an account? 
                        <span onClick={onSwitchToLogin} className='text-blue-600 cursor-pointer'> Log In</span>
                    </p>
                </form>
            </div>
            {showOptions && <Option onClose={closeOptions} />} {/* Render Options dialog if showOptions is true */}
        </div>
    );
};

export default SignUp;
