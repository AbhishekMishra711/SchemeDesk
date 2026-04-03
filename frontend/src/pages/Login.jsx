import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

        try {
            const response = await loginUser(formData);
            
            if (response.success) {
                login(response.data);
                navigate('/');
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogIn size={32} className="text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                    <p className="text-gray-600 mt-2">Login to access your saved schemes</p>
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
                    <div className="mb-6">
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
                                placeholder="Enter your password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center disabled:bg-blue-400"
                    >
                        {loading ? (
                            <span className="animate-spin mr-2">⏳</span>
                        ) : (
                            <LogIn size={20} className="mr-2" />
                        )}
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    {/* Signup Link */}
                    <p className="text-center mt-6 text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;