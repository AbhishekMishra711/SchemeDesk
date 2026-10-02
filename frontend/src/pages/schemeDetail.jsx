import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSchemeById, addFavorite, removeFavorite } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/loading';
import ErrorMessage from '../components/errorMessage';
import { 
    ArrowLeft, Building2, Users, MapPin, Briefcase, 
    GraduationCap, IndianRupee, FileText, ExternalLink,
    CheckCircle, Heart
} from 'lucide-react';

const SchemeDetail = () => {
    const { id } = useParams();
    const { user, updateFavorites } = useAuth();
    const [scheme, setScheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favLoading, setFavLoading] = useState(false);

    const isFavorite = Boolean(
        user?.favorites?.some(fav => {
            if (!fav) return false;
            const favId = typeof fav === 'string' ? fav : (fav._id || fav.toString());
            return favId === id;
        })
    );

    const handleFavoriteToggle = async () => {
        if (!user) {
            alert('Please login to save this scheme to your favorites');
            return;
        }

        setFavLoading(true);
        try {
            if (isFavorite) {
                const res = await removeFavorite(id);
                updateFavorites(res.favorites);
            } else {
                const res = await addFavorite(id);
                updateFavorites(res.favorites);
            }
        } catch (err) {
            console.error('Favorite toggle error:', err);
            alert(err.response?.data?.message || 'Failed to update favorite.');
        } finally {
            setFavLoading(false);
        }
    };

    const fetchScheme = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getSchemeById(id);
            setScheme(response.data);
        } catch (err) {
            console.error('Fetch scheme detail error:', err);
            setError(err.response?.data?.message || 'Failed to load scheme details. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchScheme();
    }, [fetchScheme]);

    if (loading) return <Loading />;
    if (error) return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Link to="/schemes" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-semibold">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to All Schemes
                </Link>
                <ErrorMessage message={error} onRetry={fetchScheme} />
            </div>
        </div>
    );
    if (!scheme) return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Link to="/schemes" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-semibold">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to All Schemes
                </Link>
                <ErrorMessage message="Scheme not found" onRetry={fetchScheme} />
            </div>
        </div>
    );

    const eli = scheme.eligibility || {};

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">

                {/* Back Button and Favorite Header Action */}
                <div className="flex justify-between items-center mb-6">
                    <Link
                        to="/schemes"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to All Schemes
                    </Link>

                    <button
                        onClick={handleFavoriteToggle}
                        disabled={favLoading}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition shadow-sm ${
                            isFavorite 
                                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} className={isFavorite ? 'text-red-500' : 'text-gray-400'} />
                        {isFavorite ? 'Saved in Favorites' : 'Save to Favorites'}
                    </button>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">
                            {scheme.name}
                        </h1>
                        <div className="flex items-center text-blue-100 text-sm md:text-base">
                            <Building2 size={18} className="mr-2 flex-shrink-0" />
                            <span>{scheme.ministry}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">About this Scheme</h2>
                            <p className="text-gray-600 leading-relaxed text-base">{scheme.description}</p>
                        </div>

                        {/* Benefits */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                            <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                                <IndianRupee size={24} className="mr-2 flex-shrink-0" />
                                Benefits
                            </h2>
                            <p className="text-green-700 leading-relaxed">{scheme.benefits}</p>
                        </div>

                        {/* Eligibility */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Eligibility Criteria</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                
                                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <Users size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-800 text-sm">Age Range</div>
                                        <div className="text-gray-600 text-sm">
                                            {eli.minAge ?? 0} - {eli.maxAge ?? 100} years
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <Users size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-800 text-sm">Gender</div>
                                        <div className="text-gray-600 text-sm">
                                            {Array.isArray(eli.gender) ? eli.gender.join(', ') : (eli.gender || 'All')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <Users size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-800 text-sm">Category</div>
                                        <div className="text-gray-600 text-sm">
                                            {Array.isArray(eli.category) ? eli.category.join(', ') : (eli.category || 'All')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <MapPin size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-800 text-sm">States Covered</div>
                                        <div className="text-gray-600 text-sm">
                                            {Array.isArray(eli.states) ? eli.states.join(', ') : (eli.states || 'All India')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <IndianRupee size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-800 text-sm">Max Income</div>
                                        <div className="text-gray-600 text-sm">
                                            {eli.maxIncome != null ? `₹${Number(eli.maxIncome).toLocaleString()}` : 'No limit specified'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <Briefcase size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-800 text-sm">Business Type</div>
                                        <div className="text-gray-600 text-sm">
                                            {Array.isArray(eli.businessType) ? eli.businessType.join(', ') : (eli.businessType || 'All')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <Briefcase size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-800 text-sm">Sectors</div>
                                        <div className="text-gray-600 text-sm">
                                            {Array.isArray(eli.sectors) ? eli.sectors.join(', ') : (eli.sectors || 'All')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <GraduationCap size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-800 text-sm">Education Required</div>
                                        <div className="text-gray-600 text-sm">
                                            {eli.educationRequired || 'None'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* How to Apply */}
                        {scheme.howToApply && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-3">How to Apply</h2>
                                <p className="text-gray-600 leading-relaxed">{scheme.howToApply}</p>
                            </div>
                        )}

                        {/* Documents Required */}
                        {Array.isArray(scheme.documentsRequired) && scheme.documentsRequired.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                                    <FileText size={22} className="mr-2 text-blue-600" />
                                    Documents Required
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {scheme.documentsRequired.map((doc, index) => (
                                        <li key={index} className="flex items-center text-gray-700 bg-gray-50 p-2.5 rounded-lg text-sm border border-gray-100">
                                            <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                                            <span>{doc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Official Website */}
                        {scheme.websiteLink && (
                            <a
                                href={scheme.websiteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full bg-blue-600 text-white py-3.5 px-6 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
                            >
                                <ExternalLink size={18} className="mr-2" />
                                Visit Official Scheme Website
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchemeDetail;