import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Search, FileText, ClipboardCheck, Heart, LogIn, LogOut, User, GraduationCap, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
        navigate('/');
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            isActive
                ? 'bg-blue-700 text-white font-semibold shadow-inner'
                : 'text-blue-100 hover:text-white hover:bg-blue-500/50'
        }`;

    const mobileNavLinkClass = ({ isActive }) =>
        `flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg text-base font-medium transition ${
            isActive
                ? 'bg-blue-700 text-white font-semibold'
                : 'text-blue-100 hover:text-white hover:bg-blue-500/50'
        }`;

    return (
        <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
                        <div className="bg-white/10 p-1.5 rounded-lg">
                            <FileText size={24} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">SchemeDesk</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-2">
                        <NavLink to="/" end className={navLinkClass}>
                            <Home size={18} />
                            <span>Home</span>
                        </NavLink>

                        <NavLink to="/schemes" className={navLinkClass}>
                            <Search size={18} />
                            <span>All Schemes</span>
                        </NavLink>

                        <NavLink to="/check-eligibility" className={navLinkClass}>
                            <ClipboardCheck size={18} />
                            <span>Eligibility Check</span>
                        </NavLink>

                        <NavLink to="/student-schemes" className={navLinkClass}>
                            <GraduationCap size={18} />
                            <span>Student Schemes</span>
                        </NavLink>

                        {/* Conditional - Logged in or not */}
                        {user ? (
                            <>
                                <NavLink to="/favorites" className={navLinkClass}>
                                    <Heart size={18} />
                                    <span>Favorites</span>
                                </NavLink>

                                <div className="flex items-center space-x-1.5 bg-blue-700/80 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-500/50 ml-2">
                                    <User size={16} />
                                    <span className="max-w-[120px] truncate">{user.name}</span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg text-sm font-medium transition ml-1"
                                    title="Logout"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <NavLink 
                                to="/login" 
                                className="flex items-center space-x-1.5 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition shadow-sm ml-2 text-sm"
                            >
                                <LogIn size={18} />
                                <span>Login</span>
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex md:hidden items-center space-x-2">
                        {user && (
                            <div className="flex items-center space-x-1 bg-blue-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                                <User size={14} />
                                <span className="max-w-[80px] truncate">{user.name}</span>
                            </div>
                        )}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-blue-700 transition"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-3 border-t border-blue-500/50 space-y-1">
                        <NavLink to="/" end className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            <Home size={18} />
                            <span>Home</span>
                        </NavLink>

                        <NavLink to="/schemes" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            <Search size={18} />
                            <span>All Schemes</span>
                        </NavLink>

                        <NavLink to="/check-eligibility" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            <ClipboardCheck size={18} />
                            <span>Check Eligibility</span>
                        </NavLink>

                        <NavLink to="/student-schemes" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            <GraduationCap size={18} />
                            <span>Student Schemes</span>
                        </NavLink>

                        {user ? (
                            <>
                                <NavLink to="/favorites" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
                                    <Heart size={18} />
                                    <span>My Favorites</span>
                                </NavLink>

                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center space-x-2.5 px-3.5 py-2.5 rounded-lg text-base font-medium text-red-200 hover:bg-red-600/30 transition text-left"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <NavLink 
                                to="/login" 
                                className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition shadow-sm mt-2 text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <LogIn size={18} />
                                <span>Login / Sign Up</span>
                            </NavLink>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;