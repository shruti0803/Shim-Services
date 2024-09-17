import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store logged-in user
    const navigate = useNavigate(); // For redirecting

    const login = (userData) => {
        setUser(userData);
        navigate('/profile'); // Redirect to profile page
    };

    const logout = () => {
        setUser(null);
        navigate('/login'); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
