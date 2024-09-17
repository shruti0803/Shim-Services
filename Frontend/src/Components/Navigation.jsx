import React, { useState } from 'react';
import BWlogo from '../assets/BWlogo.jpg';
import { Link } from 'react-router-dom';
import DialogBox from './DialogBox'; // Import the new DialogBox component

const Navigation = () => {
    const [isNavOpen, setIsNavOpen] = useState(false); // Controls dialog visibility
    const [isLoginForm, setIsLoginForm] = useState(true); // Controls form toggle (login/signup)

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    const closeDialog = () => {
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
            <DialogBox
                isOpen={isNavOpen}
                closeDialog={closeDialog}
                isLoginForm={isLoginForm}
                toggleForm={toggleForm}
            />
        </div>
    );
};

export default Navigation;
