import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Wrench, Rocket, Award, Search } from 'lucide-react';
import SchemeCard from '../components/schemeCard';
import Loading from '../components/loading';
import ErrorMessage from '../components/errorMessage';
import { getStudentSchemes } from '../services/api';

const CATEGORIES = [
    { label: 'All Schemes', value: 'all', icon: <Award size={16} /> },
    { label: 'Scholarships & Loans', value: 'scholarship', icon: <BookOpen size={16} /> },
    { label: 'Skill Development', value: 'skill', icon: <Wrench size={16} /> },
    { label: 'Startup & Innovation', value: 'startup', icon: <Rocket size={16} /> },
];

const StudentSchemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchSchemes = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getStudentSchemes();
            const list = res.data || [];
            setSchemes(list);
            setFiltered(list);
        } catch (err) {
            console.error('Error fetching student schemes:', err);
            setError(err.response?.data?.message || 'Failed to load student schemes. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchemes();
    }, []);

    useEffect(() => {
        let result = schemes;

        if (activeCategory !== 'all') {
            result = result.filter(s => {
                const name = (s.name || '').toLowerCase();
                const desc = (s.description || '').toLowerCase();
                const ministry = (s.ministry || '').toLowerCase();
                const sectors = (s.eligibility?.sectors || []).map(x => String(x).toLowerCase());
                const businessType = (s.eligibility?.businessType || []).map(x => String(x).toLowerCase());

                if (activeCategory === 'scholarship') {
                    return (
                        name.includes('scholarship') ||
                        name.includes('loan') ||
                        name.includes('vidya') ||
                        desc.includes('scholarship') ||
                        desc.includes('loan') ||
                        sectors.includes('education')
                    );
                }
                if (activeCategory === 'skill') {
                    return (
                        name.includes('skill') ||
                        name.includes('kaushal') ||
                        name.includes('training') ||
                        name.includes('apprenticeship') ||
                        name.includes('nats') ||
                        desc.includes('skill') ||
                        desc.includes('apprentice') ||
                        ministry.includes('skill')
                    );
                }
                if (activeCategory === 'startup') {
                    return (
                        name.includes('startup') ||
                        name.includes('innovation') ||
                        name.includes('ssip') ||
                        desc.includes('startup') ||
                        desc.includes('entrepreneur') ||
                        businessType.includes('startup')
                    );
                }
                return true;
            });
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            result = result.filter(s =>
                (s.name || '').toLowerCase().includes(q) ||
                (s.description || '').toLowerCase().includes(q) ||
                (s.ministry || '').toLowerCase().includes(q)
            );
        }

        setFiltered(result);
    }, [activeCategory, searchQuery, schemes]);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-3">
                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                            <GraduationCap size={40} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">Student Schemes</h1>
                    <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-4">
                        Scholarships, education loans, skill programs, and startup grants 
                        made specially for students across India.
                    </p>
                    <div className="bg-blue-700/80 inline-block px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-500/30">
                        {schemes.length} Schemes Available
                    </div>
                </div>
            </section>

            {/* SEARCH + FILTER */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                
                {/* Search Bar */}
                <div className="relative mb-6 max-w-2xl mx-auto">
                    <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search student schemes by name, keyword or ministry..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2.5 flex-wrap justify-center mb-8">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.value}
                            onClick={() => setActiveCategory(cat.value)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition shadow-sm ${
                                activeCategory === cat.value
                                    ? 'bg-blue-600 text-white shadow-blue-200'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-400 hover:text-blue-600'
                            }`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Results Count Info */}
                {!loading && !error && (
                    <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
                        <span>Showing <strong className="text-gray-800">{filtered.length}</strong> {filtered.length === 1 ? 'scheme' : 'schemes'}</span>
                        {(activeCategory !== 'all' || searchQuery) && (
                            <button
                                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Reset Filters
                            </button>
                        )}
                    </div>
                )}

                {/* Results State */}
                {loading ? (
                    <Loading />
                ) : error ? (
                    <ErrorMessage message={error} onRetry={fetchSchemes} />
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto">
                        <GraduationCap size={48} className="mx-auto text-gray-300 mb-3" />
                        <h3 className="text-lg font-bold text-gray-700 mb-1">No schemes found</h3>
                        <p className="text-gray-500 text-sm mb-4">Try clearing search or picking another category</p>
                        <button
                            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                        >
                            Show All Student Schemes
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(scheme => (
                            <SchemeCard key={scheme._id} scheme={scheme} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default StudentSchemes;