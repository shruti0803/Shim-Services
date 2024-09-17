import React, { useState } from 'react';
import BWlogo from '../assets/BWlogo.jpg';
import { Link } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

const Navigation = () => {
    const [isNavOpen, setIsNavOpen] = useState(false); // Controls dialog visibility
    const [isLoginForm, setIsLoginForm] = useState(true); // Controls form toggle (login/signup)

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    const closeDialog = () => {
        console.log("Nav Close Button Clicked");
        setIsNavOpen(false); // Close the dialog
    };

    return (
        <div className='bg-black flex items-center h-24 md:h-20 lg:h-18 sticky top-0 z-10 px-3 text-lg text-white'>
            {/* Mobile view container */}
            <div className='lg:hidden flex items-center w-full'>
                <div className='text-3xl cursor-pointer' onClick={() => setIsNavOpen(!isNavOpen)}>
                    {isNavOpen ? <span>&times;</span> : <span>&#9776;</span>}
                </div>

                {/* Logo */}
                <div className='flex-1 flex ml-4'>
                    <img src={BWlogo} alt="Logo" className='h-20' />
                </div>

                {/* Login button */}
                <button onClick={() => setIsNavOpen(true)} className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ml-4'>
                    Log In
                </button>
            </div>

            {/* Desktop view */}
            <div className='hidden lg:flex items-center w-full'>
                <div className='flex-shrink-0'>
                    <img src={BWlogo} alt="Logo" className='h-20' />
                </div>
                <div className='flex flex-1 justify-end items-center mx-4'>
                    <ul className='flex gap-5 list-none mx-4'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link>About Us</Link></li>
                        <li><Link to='/services'>Services</Link></li>
                        <li><Link to='/orders'>Orders</Link></li>
                        <li><Link to="/becomeSP">Become Servicer</Link></li>
                    </ul>
                    <button onClick={() => setIsNavOpen(true)} className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700'>
                        Log In
                    </button>
                </div>
            </div>

            {/* Form Dialog */}
            {isNavOpen && (
                <div className='fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-20'>
                    <div className='relative w-full md:max-w-2xl lg:max-w-4xl h-full max-h-[90vh] md:max-h-[90vh] lg:max-h-[90vh] flex bg-white overflow-hidden rounded-lg'>
                        {/* Close Button */}
                        <button
    className={`absolute top-4 font-extrabold text-gray-500 hover:text-gray-700 text-2xl transition-transform ease-in-out duration-1000 ${isLoginForm ? 'left-4' : 'right-4'}`}
    onClick={closeDialog} // Close the dialog box
>
    &times;
</button>

                        {/* Container for Image and Form */}
                        <div className='relative flex w-full h-full'>
                            {/* Image Section */}
                            <div className={`absolute top-0 left-0 w-1/2 h-full bg-cover bg-center transition-transform ease-in-out duration-700 ${isLoginForm ? 'translate-x-full' : 'translate-x-0'}`} style={{ 
                                backgroundImage: 'url(https://media.istockphoto.com/id/586932394/photo/home-renovation-and-diy.jpg?s=612x612&w=0&k=20&c=lNlEVW61NptLSTR-hm3It3zAhen5yfODlZofNLEhepg=)' }}></div>

                            {/* Form Section */}
                            <div className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center transition-transform ease-in-out duration-700 ${isLoginForm ? '-translate-x-full' : 'translate-x-0'}`}>
                                {isLoginForm ? (
                                    <Login onSwitchToSignUp={toggleForm} />
                                ) : (
                                    <SignUp onSwitchToLogin={toggleForm} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navigation;
