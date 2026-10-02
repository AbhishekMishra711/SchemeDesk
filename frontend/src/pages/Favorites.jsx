import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFavorites } from '../services/api';
import SchemeCard from '../components/schemeCard';
import Loading from '../components/loading';
import ErrorMessage from '../components/errorMessage';
import { Heart, LogIn } from 'lucide-react';

const Favorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchFavorites();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getFavorites();
            setFavorites(response.data || []);
        } catch (err) {
            console.error('Error fetching favorites:', err);
            setError(err.response?.data?.message || 'Failed to load favorite schemes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Not logged in
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md w-full">
                    <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
                    <p className="text-gray-600 mb-6">Please login to view and manage your saved schemes</p>
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        <LogIn size={20} className="mr-2" />
                        Login Now
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        My Favorite Schemes
                    </h1>
                    <p className="text-gray-600">
                        {favorites.length} {favorites.length === 1 ? 'scheme' : 'schemes'} saved in your profile
                    </p>
                </div>

                {/* Error State */}
                {error && (
                    <ErrorMessage message={error} onRetry={fetchFavorites} />
                )}

                {/* Content */}
                {!error && favorites.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 max-w-lg mx-auto">
                        <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No favorites yet</h3>
                        <p className="text-gray-500 mb-6">Start exploring schemes and click the heart icon to save them!</p>
                        <Link
                            to="/schemes"
                            className="inline-flex items-center bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                        >
                            Browse All Schemes
                        </Link>
                    </div>
                ) : !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map(scheme => (
                            <SchemeCard 
                                key={scheme._id} 
                                scheme={scheme}
                                onFavoriteChange={fetchFavorites}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;