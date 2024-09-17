import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onSwitchToLogin }) => {
    const [signupValues, setSignupValues] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupValues(prev => ({ ...prev, [name]: value }));

        // Clear error messages related to the changed field
        setErrorMessages(prev => ({ ...prev, [name]: '' }));
    };

    const validateField = async (field, value) => {
        try {
            const response = await fetch(`http://localhost:4002/customers/validate/${field}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: value }),
            });

            const result = await response.json();
            if (!response.ok) {
                setErrorMessages(prev => ({ ...prev, [field]: result.error || `Error validating ${field}` }));
            } else {
                setErrorMessages(prev => ({ ...prev, [field]: '' }));
            }
        } catch (error) {
            setErrorMessages(prev => ({ ...prev, [field]: 'Validation error. Please try again.' }));
        }
    };
 
    const handleSignUp = async () => {
        const { email, username, password, confirmPassword, phone } = signupValues;

        if (password !== confirmPassword) {
            setErrorMessages({ confirmPassword: 'Passwords do not match' });
            return;
        }

        try {
            // Check for existing email or username before attempting to create an account
            await validateField('email', email);
            await validateField('username', username);

            // If there are any error messages, stop further processing
            if (Object.values(errorMessages).some(msg => msg)) return;

            // Proceed with signup if no validation errors
            const response = await fetch('http://localhost:4002/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    C_Email: email,
                    C_username: username,
                    C_Phone: phone,
                    C_Name: username,
                    C_Password: password // Ensure password is included
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage('Account created successfully');
                setErrorMessages({}); // Clear all errors on success
                setTimeout(() => {
                    navigate('/option');
                }, 1000); // Delay navigation for a moment to let user see success message
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
                        name="username"
                        value={signupValues.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        className="p-3 border border-gray-300 text-black rounded text-sm w-full"
                    />
                    {errorMessages.username && <p className='text-red-600 text-sm'>{errorMessages.username}</p>}
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
