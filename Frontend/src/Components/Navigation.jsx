import React, { useState, useEffect, useRef } from 'react';  
import BWlogo from '../assets/BWlogo.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DialogBox from './DialogBox';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu visibility
    const [isLoginFormOpen, setIsLoginFormOpen] = useState(false); // For login form visibility
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null); // For selected dropdown option
    const { currentUser, logout } = useAuth();
    const dropdownRef = useRef(null);
    const ordersDropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Toggle between login and signup form
    const toggleForm = () => setIsLoginFormOpen(!isLoginFormOpen);
    const closeDialog = () => setIsLoginFormOpen(false); // Close the login dialog

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/');
    };

    const handleOrderSelect = (orderType) => {
        setSelectedStatus(orderType);
        navigate('/orders', { state: { selectedStatus: orderType } });
        setOrdersDropdownOpen(false);
    };

    // Close dropdowns if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (ordersDropdownRef.current && !ordersDropdownRef.current.contains(event.target)) {
                setOrdersDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdown on route change
    useEffect(() => {
        setDropdownOpen(false);
        setOrdersDropdownOpen(false);
    }, [location]);

    const userInitials = currentUser?.U_Name?.charAt(0) || '';

    return (
        <div className='bg-black flex items-center h-24 md:h-20 lg:h-18 sticky top-0 z-10 px-3 text-lg text-white'>
            {/* Mobile view */}
            <div className='lg:hidden flex items-center w-full'>
                <div className='text-3xl cursor-pointer' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <span>&times;</span> : <span>&#9776;</span>}
                </div>

                <div className='flex-1 flex ml-4'>
                    <img src={BWlogo} alt="Logo" className='h-20' />
                </div>

                {currentUser ? (
                    <div className='flex items-center ml-4 relative'>
                        <div 
                            className='flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full cursor-pointer' 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            ref={dropdownRef}
                        >
                            {userInitials}
                        </div>
                        {dropdownOpen && (
                            <div className='absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg' ref={dropdownRef}>
                                <ul className='list-none p-2'>
                                    <li className='p-2 hover:bg-gray-200'>
                                        <Link to='/profile'>My Profile</Link>
                                    </li>
                                    <li className='p-2 hover:bg-gray-200'>
                                        <Link to='/settings'>Settings</Link>
                                    </li>
                                    <li className='p-2 hover:bg-gray-200 cursor-pointer' onClick={handleLogout}>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={() => setIsLoginFormOpen(true)} className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ml-4'>
                        Log In
                    </button>
                )}
            </div>

            {/* Mobile menu dropdown */}
           {/* Mobile menu dropdown */}
{/* Mobile menu dropdown */}
{isMobileMenuOpen && (
    <div className='lg:hidden absolute top-0 left-0 right-0 bg-black text-white p-5 z-20'>
        <ul className='list-none'>
            <li className='p-3 hover:bg-gray-700'>
                <Link to='/'>Home</Link>
            </li>
            <li className='p-3 hover:bg-gray-700'>
                <Link to='/aboutUs'>About Us</Link>
            </li>
            <li className='p-3 hover:bg-gray-700'>
                <Link to='/services'>Services</Link>
            </li>

            {currentUser ? (
                <>
                    {/* Orders Dropdown */}
                    <li className='p-3 hover:bg-gray-700 relative'>
                        <span onClick={() => setOrdersDropdownOpen(!ordersDropdownOpen)} className="cursor-pointer">
                            Orders
                        </span>
                        {ordersDropdownOpen && (
                            <div className="absolute mt-2 w-full bg-white text-black rounded-md shadow-lg">
                                <ul className="list-none p-2">
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOrderSelect('Pending')}>
                                        Pending
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOrderSelect('Scheduled')}>
                                        Scheduled
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOrderSelect('Completed')}>
                                        Completed
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>

                    <li className='p-3 hover:bg-gray-700'>
                        <Link to='/profile'>My Profile</Link>
                    </li>
                    <li className='p-3 hover:bg-gray-700'>
                        <Link to='/settings'>Settings</Link>
                    </li>
                    <li className='p-3 hover:bg-gray-700 cursor-pointer' onClick={handleLogout}>
                        Logout
                    </li>
                </>
            ) : (
                <li className='p-3 hover:bg-gray-700'>
                    <button onClick={() => setIsLoginFormOpen(true)} className='text-white'>
                        Log In
                    </button>
                </li>
            )}
        </ul>
    </div>
)}



            {/* Desktop view */}
            <div className='hidden lg:flex items-center w-full'>
                <div className='flex-shrink-0'>
                    <img src={BWlogo} alt="Logo" className='h-20' />
                </div>
                <div className='flex flex-1 justify-end items-center mx-4'>
                    <ul className='flex gap-5 list-none mx-4'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/aboutUs'>About Us</Link></li>
                        <li><Link to='/services'>Services</Link></li>

                        {currentUser && (
                            <>
                                <li ref={ordersDropdownRef} className="relative">
                                    <span
                                        onClick={() => setOrdersDropdownOpen(!ordersDropdownOpen)}
                                        className="cursor-pointer"
                                    >
                                        Orders
                                    </span>
                                    {ordersDropdownOpen && (
                                        <div className="absolute mt-2 w-40 bg-white text-black rounded-md shadow-lg">
                                            <ul className="list-none p-2">
                                                <li
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => handleOrderSelect('Pending')}
                                                >
                                                    Pending
                                                </li>
                                                <li
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => handleOrderSelect('Scheduled')}
                                                >
                                                    Scheduled
                                                </li>
                                                <li
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => handleOrderSelect('Completed')}
                                                >
                                                    Completed
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                                {!currentUser.is_SP && (
                                    <li><Link to="/becomeSP">Become a Servicer</Link></li>
                                )}
                            </>
                        )}
                    </ul>
                    {currentUser ? (
                        <div className='relative flex items-center'>
                            <div 
                                className='flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full cursor-pointer' 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                ref={dropdownRef}
                            >
                                {userInitials}
                            </div>
                            {dropdownOpen && (
                                <div className='absolute top-12 right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg' ref={dropdownRef}>
                                    <ul className='list-none p-2'>
                                        <li className='p-2 hover:bg-gray-200'>
                                            <Link to='/profile'>My Profile</Link>
                                        </li>
                                        <li className='p-2 hover:bg-gray-200'>
                                            <Link to='/settings'>Settings</Link>
                                        </li>
                                        <li className='p-2 hover:bg-gray-200 cursor-pointer' onClick={handleLogout}>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={() => setIsLoginFormOpen(true)} className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700'>
                            Log In
                        </button>
                    )}
                </div>
            </div>

            {/* DialogBox for login */}
            <DialogBox
                isOpen={isLoginFormOpen}
                closeDialog={closeDialog}
                isLoginForm={isLoginFormOpen}
                toggleForm={toggleForm}
            />
             {isLoginFormOpen && <DialogBox closeDialog={closeDialog} />}
        </div>
    );
};

export default Navigation;
