import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSchemeById } from '../services/api';
import Loading from '../components/loading';
import ErrorMessage from '../components/errorMessage';
import { 
    ArrowLeft, Building2, Users, MapPin, Briefcase, 
    GraduationCap, IndianRupee, FileText, ExternalLink,
    CheckCircle
} from 'lucide-react';

const SchemeDetail = () => {
    const { id } = useParams();
    const [scheme, setScheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchScheme();
    }, [id]);

    const fetchScheme = async () => {
        try {
            setLoading(true);
            const response = await getSchemeById(id);
            setScheme(response.data);
        } catch (err) {
            setError('Failed to load scheme details.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
    if (!scheme) return <ErrorMessage message="Scheme not found" />;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">

                {/* Back Button */}
                <Link
                    to="/schemes"
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-semibold"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to All Schemes
                </Link>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-6">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">
                            {scheme.name}
                        </h1>
                        <div className="flex items-center text-blue-100">
                            <Building2 size={18} className="mr-2" />
                            {scheme.ministry}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">About this Scheme</h2>
                            <p className="text-gray-600 leading-relaxed">{scheme.description}</p>
                        </div>

                        {/* Benefits */}
                        <div className="bg-green-50 rounded-xl p-6 mb-8">
                            <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                                <IndianRupee size={24} className="mr-2" />
                                Benefits
                            </h2>
                            <p className="text-green-700">{scheme.benefits}</p>
                        </div>

                        {/* Eligibility */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Eligibility Criteria</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                
                                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                    <Users size={20} className="text-blue-600 mr-3 mt-1" />
                                    <div>
                                        <div className="font-semibold text-gray-800">Age</div>
                                        <div className="text-gray-600">
                                            {scheme.eligibility.minAge} - {scheme.eligibility.maxAge} years
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                    <Users size={20} className="text-blue-600 mr-3 mt-1" />
                                    <div>
                                        <div className="font-semibold text-gray-800">Gender</div>
                                        <div className="text-gray-600">
                                            {scheme.eligibility.gender.join(', ')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                    <Users size={20} className="text-blue-600 mr-3 mt-1" />
                                    <div>
                                        <div className="font-semibold text-gray-800">Category</div>
                                        <div className="text-gray-600">
                                            {scheme.eligibility.category.join(', ')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                    <MapPin size={20} className="text-blue-600 mr-3 mt-1" />
                                    <div>
                                        <div className="font-semibold text-gray-800">States</div>
                                        <div className="text-gray-600">
                                            {scheme.eligibility.states.join(', ')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                    <IndianRupee size={20} className="text-blue-600 mr-3 mt-1" />
                                    <div>
                                        <div className="font-semibold text-gray-800">Max Income</div>
                                        <div className="text-gray-600">
                                            ₹{scheme.eligibility.maxIncome.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                    <Briefcase size={20} className="text-blue-600 mr-3 mt-1" />
                                    <div>
                                        <div className="font-semibold text-gray-800">Business Type</div>
                                        <div className="text-gray-600">
                                            {scheme.eligibility.businessType.join(', ')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                    <Briefcase size={20} className="text-blue-600 mr-3 mt-1" />
                                    <div>
                                        <div className="font-semibold text-gray-800">Sectors</div>
                                        <div className="text-gray-600">
                                            {scheme.eligibility.sectors.join(', ')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                    <GraduationCap size={20} className="text-blue-600 mr-3 mt-1" />
                                    <div>
                                        <div className="font-semibold text-gray-800">Education</div>
                                        <div className="text-gray-600">
                                            {scheme.eligibility.educationRequired}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* How to Apply */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">How to Apply</h2>
                            <p className="text-gray-600">{scheme.howToApply}</p>
                        </div>

                        {/* Documents Required */}
                        {scheme.documentsRequired && scheme.documentsRequired.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                                    <FileText size={24} className="mr-2" />
                                    Documents Required
                                </h2>
                                <ul className="space-y-2">
                                    {scheme.documentsRequired.map((doc, index) => (
                                        <li key={index} className="flex items-center text-gray-600">
                                            <CheckCircle size={18} className="text-green-500 mr-2" />
                                            {doc}
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
                                className="flex items-center justify-center w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                <ExternalLink size={20} className="mr-2" />
                                Visit Official Website
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchemeDetail;