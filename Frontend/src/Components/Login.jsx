import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import bcrypt from 'bcryptjs';
import { useAuthAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';


const Login = ({ onSwitchToSignUp, closeDialog,isAdmin }) => {
    const [loginValues, setLoginValues] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { login } = useAuth();
    const {loginAdmin}=useAuthAdmin();
    const navigate=useNavigate();
    // console.log(loginAdmin);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginValues(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            // Fetch customers
            if(!isAdmin){
            const customerResponse = await fetch('http://localhost:4002/customers');
            const customers = await customerResponse.json();
            console.log('Customers:', customers);  // Log all customer data
    
            // Find matching customer
            const customer = customers.find(c => c.U_Email === loginValues.email);
            console.log('Customer found:', customer);  // Log the found customer object
    
            if (!customer) {
                setErrorMessage('Invalid email or password');
                setSuccessMessage('');
                return;
            }
    
            // Check if the password exists for the customer
            if (!customer.U_Password) {
                throw new Error('Password not found in customer data');
            }
    
            // Compare passwords
            const isMatch = await bcrypt.compare(loginValues.password, customer.U_Password);
            if (isMatch) {
                login(customer);
                setSuccessMessage('Login Successful!');
                setErrorMessage('');
                closeDialog();
            } else {
                setErrorMessage('Invalid email or password');
                setSuccessMessage('');
            }
        }
        else{
            const adminResponse = await fetch('http://localhost:4002/admins');
            const admins = await adminResponse.json();

            console.log('Admins:', admins);  // Log all customer data
    
            // Find matching customer
            const admin = admins.find(c => c.A_Email === loginValues.email);
            console.log('Admin found:', admin);  // Log the found customer object
    
            if (!admin) {
                setErrorMessage('Invalid email or password');
                setSuccessMessage('');
                return;
            }
    
            // Check if the password exists for the customer
            
            if (loginValues.password === admin.A_Password) {
                loginAdmin(admin);
                console.log('Admin login successful');
                setSuccessMessage('Admin Login Successful!');
                setErrorMessage('');
                closeDialog();
                navigate('/admin');
                
                
            } else {
                setErrorMessage('Invalid admin password');
                setSuccessMessage('');
            }

        }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Failed to login. Please try again.');
            setSuccessMessage('');
        }
    };
    
    

    return (
        <div className='flex items-center justify-center w-full p-6'>
            <div className='flex flex-col w-full max-w-md p-6 bg-white rounded-lg'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-900'>
                    Welcome Back! to SHIM SERVICES
                </h2>
                <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        name="email"
                        value={loginValues.email}
                        onChange={handleInputChange}
                        placeholder="Email" 
                        className="p-3 border text-black border-gray-300 rounded text-sm" 
                        required
                    />
                    <input 
                        type="password" 
                        name="password"
                        value={loginValues.password}
                        onChange={handleInputChange}
                        placeholder="Password" 
                        className="p-3 border text-black border-gray-300 rounded text-sm" 
                        required
                    />
                    {successMessage && (
                        <p className='text-green-500 text-sm'>{successMessage}</p>
                    )}
                    {errorMessage && (
                        <p className='text-red-500 text-sm'>{errorMessage}</p>
                    )}
                    <button type='submit' className='bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm'>
                        Login
                    </button>
                    {!isAdmin &&
                    <p className='mt-4 text-sm text-center text-gray-700'>
                        Don't have an account? 
                        <span onClick={onSwitchToSignUp} className='text-blue-600 cursor-pointer'> Sign Up</span>
                    </p>
}
                </form>
            </div>
        </div>
    );
};

export default Login;
