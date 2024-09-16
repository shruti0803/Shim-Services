import React, { useState } from 'react';
import BWlogo from '../assets/BWlogo.jpg';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className='bg-black flex items-center h-24 md:h-20 lg:h-18 sticky top-0 z-10 px-3 text-lg text-white'>
            {/* Mobile view container */}
            <div className='lg:hidden flex items-center w-full'>
                {/* Hamburger icon */}
                <div className='text-3xl cursor-pointer' onClick={toggleNav}>
                    {isNavOpen ? <span>&times;</span> : <span>&#9776;</span>}
                </div>

                {/* Logo */}
                <div className='flex-1 flex ml-4'>
                    <img src={BWlogo} alt="Logo" className='h-20' /> {/* Adjust height for mobile view */}
                </div>

                {/* Login button on the right side */}
                <Link to="/login">
                    <button className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ml-4'>
                        Log In
                    </button>
                </Link>
            </div>

            {/* Desktop view */}
            <div className='hidden lg:flex items-center w-full'>
                {/* Logo */}
                <div className='flex-shrink-0'>
                    <img src={BWlogo} alt="Logo" className='h-20' /> {/* Adjust height for desktop view */}
                </div>
                
                {/* Navigation links and login button */}
                <div className='flex flex-1 justify-end items-center mx-4'>
                    {/* Navigation links */}
                    <ul className='flex gap-5 list-none mx-4'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link>About Us</Link></li>
                        <li><Link to='/services'>Services</Link></li>
                        <li><Link to='/orders'>Orders</Link></li>
                        <li><Link to="/becomeSP">Become Servicer</Link></li>
                    </ul>

                    {/* Login button */}
                    <Link to="/login">
                        <button className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700'>
                            Log In
                        </button>
                    </Link>
                </div>
            </div>

            {/* Conditionally render navigation links based on toggle state */}
            {isNavOpen && (
                <div className="lg:hidden absolute top-24 left-0 w-full bg-gray-900 py-3 px-5 flex flex-col gap-4">
                    <ul className='list-none flex flex-col'>
                        <li><Link to="/" className='py-2'>Home</Link></li>
                        <li><Link className='py-2'>About Us</Link></li>
                        <li><Link to="/services" className='py-2'>Services</Link></li>
                        <li><Link to="/orders" className='py-2'>Orders</Link></li>
                        <li><Link to="/becomeSP" className='py-2'>Become Servicer</Link></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navigation;
