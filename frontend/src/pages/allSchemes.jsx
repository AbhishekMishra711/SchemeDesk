import React from 'react';
import { useState, useEffect } from 'react';
import { getAllSchemes, searchSchemes } from '../services/api';
import SchemeCard from '../components/schemeCard';
import Loading from '../components/loading';
import ErrorMessage from '../components/errorMessage';
import { Search, Filter } from 'lucide-react';

const AllSchemes = () => {
    // States
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Page load hone pe schemes fetch karo
    useEffect(() => {
        fetchSchemes();
    }, []);

    // Schemes fetch karne ka function
    const fetchSchemes = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllSchemes();
            setSchemes(response.data);
        } catch (err) {
            setError('Failed to load schemes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Search handle karo
    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchQuery.trim()) {
            fetchSchemes();
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await searchSchemes(searchQuery);
            setSchemes(response.data);
        } catch (err) {
            setError('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery('');
        fetchSchemes();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">

                {/* ============================================ */}
                {/* Header */}
                {/* ============================================ */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        All Government Schemes
                    </h1>
                    <p className="text-gray-600">
                        Browse through {schemes.length} available schemes for startups and businesses
                    </p>
                </div>

                {/* ============================================ */}
                {/* Search Bar */}
                {/* ============================================ */}
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search schemes by name or keyword..."
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            Search
                        </button>
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </form>

                {/* ============================================ */}
                {/* Content */}
                {/* ============================================ */}
                {loading ? (
                    <Loading />
                ) : error ? (
                    <ErrorMessage message={error} />
                ) : schemes.length === 0 ? (
                    <div className="text-center py-12">
                        <Filter size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600">No schemes found</h3>
                        <p className="text-gray-500">Try a different search term</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {schemes.map(scheme => (
                            <SchemeCard key={scheme._id} scheme={scheme} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllSchemes;