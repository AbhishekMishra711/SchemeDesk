import React from 'react';
import { useState } from 'react';
import { matchSchemes, getStudentSchemes } from '../services/api';
import EligibilityForm from '../components/eligibilityForm';
import SchemeCard from '../components/schemeCard';
import ErrorMessage from '../components/errorMessage';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const CheckEligibility = () => {
    // States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    // Form submit handler
    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            setError(null);
            
            let response;
            
            if (formData.schemeType === 'student') {
                // Student schemes fetch karo
                const studentData = await getStudentSchemes();
                const list = studentData.data || [];
                
                // Frontend filtering
                const filtered = list.filter(scheme => {
                    const eli = scheme.eligibility;
                    if (!eli) return true;
                    
                    // Age check
                    const minAge = eli.minAge ?? 0;
                    const maxAge = eli.maxAge ?? 100;
                    if (formData.age < minAge || formData.age > maxAge) return false;
                    
                    // Gender check
                    if (eli.gender && eli.gender.length > 0) {
                        const genderMatch = eli.gender.includes('All') || eli.gender.includes(formData.gender);
                        if (!genderMatch) return false;
                    }
                    
                    // Category check
                    if (eli.category && eli.category.length > 0) {
                        const categoryMatch = eli.category.includes('All') || eli.category.includes(formData.category);
                        if (!categoryMatch) return false;
                    }
                    
                    // State check
                    if (eli.states && eli.states.length > 0) {
                        const stateMatch = eli.states.includes('All India') || eli.states.includes('All') || eli.states.includes(formData.state);
                        if (!stateMatch) return false;
                    }
                    
                    // Income check
                    if (eli.maxIncome != null && formData.income > eli.maxIncome) return false;
                    
                    return true;
                });
                
                response = {
                    success: true,
                    count: filtered.length,
                    data: filtered,
                    userDetails: formData
                };
            } else {
                // General schemes
                response = await matchSchemes({
                    age: formData.age,
                    gender: formData.gender,
                    category: formData.category,
                    state: formData.state,
                    income: formData.income,
                    businessType: formData.businessType,
                    sector: formData.sector
                });

                if (response) {
                    response.userDetails = {
                        ...(response.userDetails || formData),
                        schemeType: 'general'
                    };
                }
            }
            
            setResults(response);
            setSubmitted(true);
            
        } catch (err) {
            console.error('Eligibility check error:', err);
            setError(err.response?.data?.message || 'Failed to find matching schemes. Please ensure the backend server is running and try again.');
        } finally {
            setLoading(false);
        }
    };

    // Reset form
    const handleReset = () => {
        setResults(null);
        setSubmitted(false);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">

                {/* ============================================ */}
                {/* Header */}
                {/* ============================================ */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Check Your Eligibility
                    </h1>
                    <p className="text-gray-600">
                        Fill in your details to find government schemes you qualify for
                    </p>
                </div>

                {/* ============================================ */}
                {/* Form OR Results */}
                {/* ============================================ */}
                {!submitted ? (
                    // Show Form
                    <div className="max-w-2xl mx-auto">
                        <EligibilityForm onSubmit={handleSubmit} loading={loading} />
                        {error && (
                            <div className="mt-4">
                                <ErrorMessage message={error} />
                            </div>
                        )}
                    </div>
                ) : (
                    // Show Results
                    <div>
                        {/* Back Button */}
                        <button
                            onClick={handleReset}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-semibold transition"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Check Again with Different Details
                        </button>

                        {/* User Details Summary */}
                        {results?.userDetails && (
                            <div className={`rounded-xl p-6 mb-8 border ${
                                results.userDetails.schemeType === 'student' 
                                    ? 'bg-green-50 border-green-200' 
                                    : 'bg-blue-50 border-blue-200'
                            }`}>
                                <h3 className={`font-bold mb-4 ${
                                    results.userDetails.schemeType === 'student'
                                        ? 'text-green-800'
                                        : 'text-blue-800'
                                }`}>
                                    Your Profile:
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Age:</span>
                                        <span className="ml-2 font-semibold text-gray-800">{results.userDetails.age} years</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Gender:</span>
                                        <span className="ml-2 font-semibold text-gray-800">{results.userDetails.gender}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Category:</span>
                                        <span className="ml-2 font-semibold text-gray-800">{results.userDetails.category}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">State:</span>
                                        <span className="ml-2 font-semibold text-gray-800">{results.userDetails.state}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Income:</span>
                                        <span className="ml-2 font-semibold text-gray-800">₹{Number(results.userDetails.income || 0).toLocaleString()}</span>
                                    </div>
                                    {results.userDetails.schemeType === 'general' && (
                                        <>
                                            <div>
                                                <span className="text-gray-600">Business:</span>
                                                <span className="ml-2 font-semibold text-gray-800">{results.userDetails.businessType}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Sector:</span>
                                                <span className="ml-2 font-semibold text-gray-800">{results.userDetails.sector}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Results Count */}
                        {results?.count > 0 ? (
                            <div className={`flex items-center px-6 py-4 rounded-xl mb-8 border ${
                                results.userDetails?.schemeType === 'student'
                                    ? 'bg-green-50 border-green-200 text-green-800'
                                    : 'bg-blue-50 border-blue-200 text-blue-800'
                            }`}>
                                <CheckCircle size={28} className="mr-3 text-green-600 flex-shrink-0" />
                                <div>
                                    <span className="font-bold text-2xl">{results.count}</span>
                                    <span className="ml-2 text-base md:text-lg">
                                        {results.userDetails?.schemeType === 'student' ? 'student schemes' : 'schemes'} found matching your profile!
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-xl mb-8">
                                <AlertCircle size={28} className="mr-3 text-yellow-600 flex-shrink-0" />
                                <div>
                                    <span className="font-bold">No exact matches found.</span>
                                    <span className="ml-2">Try adjusting your criteria or browse all schemes.</span>
                                </div>
                            </div>
                        )}

                        {/* Scheme Cards */}
                        {results?.data && results.data.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {results.data.map(scheme => (
                                    <SchemeCard key={scheme._id} scheme={scheme} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckEligibility;