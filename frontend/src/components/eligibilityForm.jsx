import React from 'react';
import { useState } from 'react';
import { Search } from 'lucide-react';

const EligibilityForm = ({ onSubmit, loading }) => {
    
    // Form ka data store karne ke liye state
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        category: '',
        state: '',
        income: '',
        businessType: '',
        sector: ''
    });

    // NEW: Scheme type toggle
    const [schemeType, setSchemeType] = useState('general');

    // Input change hone pe state update karo
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Form submit hone pe
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Data ko sahi format mein bhejo
        const submitData = {
            ...formData,
            age: parseInt(formData.age),
            income: parseInt(formData.income),
            schemeType  // NEW: scheme type pass karo
        };
        
        onSubmit(submitData);
    };

    // Dropdown options
    const genderOptions = ['Male', 'Female', 'Other'];
    const categoryOptions = ['General', 'SC', 'ST', 'OBC'];
    const businessTypeOptions = ['Startup', 'Existing'];
    const sectorOptions = [
        'Technology', 'Manufacturing', 'Services', 'Agriculture', 
        'Healthcare', 'Education', 'Trading'
    ];
    const stateOptions = [
        'All India', 'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
        'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 
        'Uttar Pradesh', 'West Bengal'
    ];

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
            
            {/* NEW: Toggle Section */}
            <div className="mb-6 bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center justify-center gap-4">
                    <span className={`font-semibold transition ${schemeType === 'general' ? 'text-blue-600' : 'text-gray-400'}`}>
                        💼 General Schemes
                    </span>
                    <button
                        type="button"
                        onClick={() => setSchemeType(prev => prev === 'general' ? 'student' : 'general')}
                        className={`relative w-14 h-7 rounded-full transition-colors ${
                            schemeType === 'student' ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                    >
                        <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                            schemeType === 'student' ? 'translate-x-7' : 'translate-x-0'
                        }`}></span>
                    </button>
                    <span className={`font-semibold transition ${schemeType === 'student' ? 'text-green-600' : 'text-gray-400'}`}>
                        🎓 Student Schemes
                    </span>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Check Your Eligibility
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Age */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Age *
                    </label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        required
                        min="15"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Gender *
                    </label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                        <option value="">Select Gender</option>
                        {genderOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Category *
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                        <option value="">Select Category</option>
                        {categoryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* State */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        State *
                    </label>
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                        <option value="">Select State</option>
                        {stateOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* Annual Income */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Annual Income (₹) *
                    </label>
                    <input
                        type="number"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        placeholder="e.g. 500000"
                        required
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                </div>

                {/* Business Type - Only for General */}
                {schemeType === 'general' && (
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Business Type *
                        </label>
                        <select
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            required={schemeType === 'general'}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        >
                            <option value="">Select Business Type</option>
                            {businessTypeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Sector - Only for General */}
                {schemeType === 'general' && (
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">
                            Sector/Industry *
                        </label>
                        <select
                            name="sector"
                            value={formData.sector}
                            onChange={handleChange}
                            required={schemeType === 'general'}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        >
                            <option value="">Select Sector</option>
                            {sectorOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full mt-6 py-3 rounded-lg font-semibold text-white transition flex items-center justify-center disabled:cursor-not-allowed ${
                    schemeType === 'student' 
                        ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-400' 
                        : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400'
                }`}
            >
                {loading ? (
                    <>
                        <span className="animate-spin mr-2">⏳</span>
                        Finding Schemes...
                    </>
                ) : (
                    <>
                        <Search size={20} className="mr-2" />
                        Find {schemeType === 'student' ? 'Student' : 'Matching'} Schemes
                    </>
                )}
            </button>
        </form>
    );
};

export default EligibilityForm;