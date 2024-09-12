import React, { useState } from 'react';
import BWlogo from '../assets/BWlogo.jpg'
import { Link } from 'react-router-dom';

const Navigation = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className='bg-black flex items-center h-24 md:h-20 lg:h-18 sticky top-0 z-10 px-3 text-lg text-white'>
            <div className='h-full'>
                <img src={BWlogo} alt="Logo" className='h-full' />
            </div>
            <div className="ml-auto flex items-center gap-7">
                {/* Show navigation toggle button only on mobile */}
                <div className='block lg:hidden text-3xl cursor-pointer' onClick={toggleNav}>
                    {isNavOpen ? (
                        <span>&times;</span>
                    ) : (
                        <span>&#9776;</span>
                    )}
                </div>
                {/* Show navigation links */}
                <ul className='hidden lg:flex gap-5 list-none'>
                    <Link to='/'>Home</Link>
                    <Link>About Us</Link>
                    <Link to='/services'>Services</Link>
                </ul>
                <Link to="/becomeSP">
                <div className='hidden lg:block'>
                    <button className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ml-4'>Become Servicer</button>
                </div>
                </Link>
            </div>

            {/* Conditionally render navigation links based on toggle state */}
            {isNavOpen && (
                <div className="lg:hidden absolute top-24 left-0 w-full bg-gray-900 py-3 px-5 flex flex-col gap-4">
                    <ul className='list-none'>
                        <Link to="/" >Home</Link>
                        <Link>About Us</Link>
                        <Link to="/services">Services</Link>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navigation;
