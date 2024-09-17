// src/components/SignUp.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const SignUp = ({ onSwitchToLogin, closeDialog }) => { // Added onCloseDialog prop
    const [signupValues, setSignupValues] = useState({
        email: '',
        fullname: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { updateCurrentUser } = useAuth(); // Use AuthContext

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupValues(prev => ({ ...prev, [name]: value }));
        setErrorMessages(prev => ({ ...prev, [name]: '' }));
    };

    const handleSignUp = async () => {
        const { email, fullname, password, confirmPassword, phone } = signupValues;

        if (password !== confirmPassword) {
            setErrorMessages({ confirmPassword: 'Passwords do not match' });
            return;
        }

        try {
            const response = await fetch('http://localhost:4002/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    C_username: password,
                    C_Name: fullname,
                    C_Email: email,
                    C_Phone: phone,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage('Account created successfully');
                setErrorMessages({});
                setTimeout(() => {
                    // Call onCloseDialog to close the dialog
                    closeDialog();
                    // Navigate to /option page
                    navigate('/option');
                }, 1000);
            } else {
                setErrorMessages({ general: result.error || 'Error occurred during signup' });
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessages({ general: 'Failed to sign up. Please try again later.' });
            setSuccessMessage('');
        }
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
                        className="p-3 border border-gray-300 rounded text-black text-sm w-full"
                    />
                    {errorMessages.email && <p className='text-red-600 text-sm'>{errorMessages.email}</p>}
                    <input
                        type="text"
                        name="fullname"
                        value={signupValues.fullname}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="p-3 border border-gray-300 text-black rounded text-sm w-full"
                    />
                    {errorMessages.fullname && <p className='text-red-600 text-sm'>{errorMessages.fullname}</p>}
                    <input
                        type="password"
                        name="password"
                        value={signupValues.password}
                        onChange={handleInputChange}
                        placeholder="Create Password"
                        className="p-3 border border-gray-300 text-black rounded text-sm w-full"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={signupValues.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        className="p-3 border border-gray-300 text-black rounded text-sm w-full"
                    />
                    {errorMessages.confirmPassword && <p className='text-red-600 text-sm'>{errorMessages.confirmPassword}</p>}
                    <input
                        type="text"
                        name="phone"
                        value={signupValues.phone}
                        onChange={handleInputChange}
                        placeholder="Phone No."
                        className="p-3 border border-gray-300 text-black rounded text-sm w-full"
                    />
                    {errorMessages.general && <p className='text-red-600 text-sm'>{errorMessages.general}</p>}
                    {successMessage && <p className='text-green-600 text-sm'>{successMessage}</p>}
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
        </div>
    );
};

export default SignUp;
