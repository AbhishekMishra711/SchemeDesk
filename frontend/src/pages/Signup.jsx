import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/api';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Password match check
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Password length check
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            const response = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            if (response.success) {
                login(response.data);
                navigate('/');
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserPlus size={32} className="text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                    <p className="text-gray-600 mt-2">Join SchemeDesk to save your favorite schemes</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                    
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center">
                            <AlertCircle size={20} className="mr-2" />
                            {error}
                        </div>
                    )}

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Minimum 6 characters</p>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center disabled:bg-green-400"
                    >
                        {loading ? (
                            <span className="animate-spin mr-2">⏳</span>
                        ) : (
                            <CheckCircle size={20} className="mr-2" />
                        )}
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    {/* Login Link */}
                    <p className="text-center mt-6 text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;