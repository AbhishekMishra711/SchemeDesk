import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

// ============================================
// Context Banao
// ============================================
const AuthContext = createContext();

// ============================================
// Provider Component
// ============================================
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Page load pe check karo user logged in hai?
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    // Login function
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Update favorites
    const updateFavorites = (favorites) => {
        const updatedUser = { ...user, favorites };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            login, 
            logout, 
            updateFavorites 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// ============================================
// Custom Hook - Easy Access
// ============================================
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;