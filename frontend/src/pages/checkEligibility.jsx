import React from 'react';
import { useState } from 'react';
import { matchSchemes } from '../services/api';
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
            
            const response = await matchSchemes(formData);
            setResults(response);
            setSubmitted(true);
            
        } catch (err) {
            setError('Failed to find matching schemes. Please try again.');
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
                        Fill in your details to find government schemes you're eligible for
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
                            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-semibold"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Check Again with Different Details
                        </button>

                        {/* User Details Summary */}
                        {results?.userDetails && (
                            <div className="bg-blue-50 rounded-xl p-6 mb-8">
                                <h3 className="font-bold text-blue-800 mb-4">Your Profile:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Age:</span>
                                        <span className="ml-2 font-semibold">{results.userDetails.age} years</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Gender:</span>
                                        <span className="ml-2 font-semibold">{results.userDetails.gender}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Category:</span>
                                        <span className="ml-2 font-semibold">{results.userDetails.category}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">State:</span>
                                        <span className="ml-2 font-semibold">{results.userDetails.state}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Income:</span>
                                        <span className="ml-2 font-semibold">₹{results.userDetails.income.toLocaleString()}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Business:</span>
                                        <span className="ml-2 font-semibold">{results.userDetails.businessType}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Sector:</span>
                                        <span className="ml-2 font-semibold">{results.userDetails.sector}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Results Count */}
                        {results?.count > 0 ? (
                            <div className="flex items-center bg-green-50 text-green-700 px-6 py-4 rounded-xl mb-8">
                                <CheckCircle size={28} className="mr-3" />
                                <div>
                                    <span className="font-bold text-2xl">{results.count}</span>
                                    <span className="ml-2 text-lg">schemes found for you!</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center bg-yellow-50 text-yellow-700 px-6 py-4 rounded-xl mb-8">
                                <AlertCircle size={28} className="mr-3" />
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