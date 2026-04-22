import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Search, FileText, ClipboardCheck, Heart, LogIn, LogOut, User,GraduationCap  } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <FileText size={28} />
                        <span className="text-xl font-bold">SchemeDesk</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        <Link 
                            to="/" 
                            className="flex items-center space-x-1 hover:text-blue-200 transition"
                        >
                            <Home size={20} />
                            <span className="hidden md:inline">Home</span>
                        </Link>

                        <Link 
                            to="/schemes" 
                            className="flex items-center space-x-1 hover:text-blue-200 transition"
                        >
                            <Search size={20} />
                            <span className="hidden md:inline">Schemes</span>
                        </Link>

                        <Link 
                            to="/check-eligibility" 
                            className="flex items-center space-x-1 hover:text-blue-200 transition"
                        >
                            <ClipboardCheck size={20} />
                            <span className="hidden md:inline">Eligibility</span>
                        </Link>

                        <Link 
    to="/student-schemes" 
    className="flex items-center space-x-1 hover:text-blue-200 transition"
>
    <GraduationCap size={20} />
    <span className="hidden md:inline">Students</span>
</Link>

                        {/* Conditional - Logged in or not */}
                        {user ? (
                            <>
                                <Link 
                                    to="/favorites" 
                                    className="flex items-center space-x-1 hover:text-blue-200 transition"
                                >
                                    <Heart size={20} />
                                    <span className="hidden md:inline">Favorites</span>
                                </Link>

                                <div className="flex items-center space-x-2 bg-blue-700 px-3 py-1 rounded-lg">
                                    <User size={18} />
                                    <span className="hidden md:inline">{user.name}</span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    <LogOut size={18} />
                                    <span className="hidden md:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link 
                                to="/login" 
                                className="flex items-center space-x-1 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
                            >
                                <LogIn size={20} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;