/* eslint-disable react-refresh/only-export-components */
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
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (err) {
            console.error('Failed to parse user from localStorage:', err);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    // Login function
    const login = (userData) => {
        setUser(userData);
        try {
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            console.error('Failed to save user to localStorage:', err);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Update favorites
    const updateFavorites = (favorites) => {
        setUser((prevUser) => {
            if (!prevUser) return null;
            const updatedUser = { ...prevUser, favorites };
            try {
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } catch (err) {
                console.error('Failed to update favorites in localStorage:', err);
            }
            return updatedUser;
        });
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