import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addFavorite, removeFavorite } from '../services/api';
import { ArrowRight, Building2, IndianRupee, Heart } from 'lucide-react';

const SchemeCard = ({ scheme, onFavoriteChange }) => {
    const { user, updateFavorites } = useAuth();
    const [loading, setLoading] = useState(false);

    // Check if scheme is in favorites (handles both string array and object array)
    const isFavorite = Boolean(
        user?.favorites?.some(fav => {
            if (!fav) return false;
            const favId = typeof fav === 'string' ? fav : (fav._id || fav.toString());
            return favId === scheme._id;
        })
    );

    const handleFavoriteClick = async (e) => {
        e.preventDefault(); // Link click na ho
        e.stopPropagation();

        if (!user) {
            alert('Please login to save favorites');
            return;
        }

        setLoading(true);
        try {
            if (isFavorite) {
                const response = await removeFavorite(scheme._id);
                updateFavorites(response.favorites);
            } else {
                const response = await addFavorite(scheme._id);
                updateFavorites(response.favorites);
            }
            
            // Refresh favorites page if callback provided
            if (onFavoriteChange) {
                onFavoriteChange();
            }
        } catch (error) {
            console.error('Error updating favorite:', error);
            alert(error.response?.data?.message || 'Failed to update favorite. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100 relative flex flex-col justify-between h-full">
            <div>
                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    disabled={loading}
                    title={isFavorite ? "Remove from favorites" : "Save to favorites"}
                    className={`absolute top-4 right-4 p-2 rounded-full transition ${
                        isFavorite 
                            ? 'bg-red-100 text-red-500' 
                            : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400'
                    } disabled:opacity-50`}
                >
                    <Heart 
                        size={20} 
                        fill={isFavorite ? 'currentColor' : 'none'}
                    />
                </button>

                {/* Scheme Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 pr-12 line-clamp-2">
                    {scheme.name}
                </h3>

                {/* Ministry */}
                <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Building2 size={16} className="mr-1.5 flex-shrink-0" />
                    <span className="line-clamp-1">{scheme.ministry}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {scheme.description}
                </p>

                {/* Benefits Preview */}
                <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-100">
                    <div className="flex items-center text-green-700 font-semibold mb-1 text-sm">
                        <IndianRupee size={16} className="mr-1 flex-shrink-0" />
                        <span>Benefits:</span>
                    </div>
                    <p className="text-green-700 text-sm line-clamp-2">
                        {scheme.benefits}
                    </p>
                </div>
            </div>

            {/* View Details Button */}
            <Link 
                to={`/schemes/${scheme._id}`}
                className="flex items-center justify-center w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition font-medium text-sm mt-2"
            >
                <span>View Details</span>
                <ArrowRight size={16} className="ml-2" />
            </Link>
        </div>
    );
};

export default SchemeCard;