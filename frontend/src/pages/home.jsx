import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, FileCheck, Users, TrendingUp } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen">
            
            {/* ============================================ */}
            {/* HERO SECTION - Main Banner */}
            {/* ============================================ */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Find Government Schemes
                        <span className="block text-blue-200">Made For You</span>
                    </h1>
                    
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Discover startup and business schemes you're eligible for. 
                        Just fill your details and get personalized recommendations instantly.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/check-eligibility"
                            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition flex items-center justify-center"
                        >
                            <Search size={24} className="mr-2" />
                            Check Eligibility Now
                        </Link>
                        
                        <Link
                            to="/schemes"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition flex items-center justify-center"
                        >
                            Browse All Schemes
                            <ArrowRight size={24} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* FEATURES SECTION - Kya Kya Milega */}
            {/* ============================================ */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        How SchemeDesk Helps You
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-md text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={32} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Smart Search
                            </h3>
                            <p className="text-gray-600">
                                Enter your details once and find all matching government schemes instantly.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-md text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileCheck size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Eligibility Check
                            </h3>
                            <p className="text-gray-600">
                                Know exactly which schemes you qualify for based on your profile.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-md text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrendingUp size={32} className="text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Latest Updates
                            </h3>
                            <p className="text-gray-600">
                                Get information about 20+ central and state government schemes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* STATS SECTION - Numbers */}
            {/* ============================================ */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        
                        <div>
                            <div className="text-4xl font-bold mb-2">20+</div>
                            <div className="text-blue-200">Government Schemes</div>
                        </div>
                        
                        <div>
                            <div className="text-4xl font-bold mb-2">₹10L+</div>
                            <div className="text-blue-200">Funding Available</div>
                        </div>
                        
                        <div>
                            <div className="text-4xl font-bold mb-2">100%</div>
                            <div className="text-blue-200">Free To Use</div>
                        </div>
                        
                        <div>
                            <div className="text-4xl font-bold mb-2">All India</div>
                            <div className="text-blue-200">Coverage</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* CTA SECTION - Call To Action */}
            {/* ============================================ */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Ready to Find Your Perfect Scheme?
                    </h2>
                    
                    <p className="text-gray-600 mb-8 text-lg">
                        It takes less than 2 minutes to check your eligibility for multiple schemes.
                    </p>
                    
                    <Link
                        to="/check-eligibility"
                        className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
                    >
                        <Users size={24} className="mr-2" />
                        Get Started - It's Free
                    </Link>
                </div>
            </section>

            {/* ============================================ */}
            {/* FOOTER */}
            {/* ============================================ */}
            <footer className="bg-gray-800 text-gray-300 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="mb-2">
                        <strong className="text-white">SchemeDesk</strong> - Your Gateway to Government Schemes
                    </p>
                    <p className="text-sm">
                        Data Source: myscheme.gov.in
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;