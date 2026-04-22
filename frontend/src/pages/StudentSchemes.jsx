import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Wrench, Rocket, Award, Search } from 'lucide-react';
import SchemeCard from '../components/schemeCard';
import { getStudentSchemes } from '../services/api';

const CATEGORIES = [
    { label: 'All', value: 'all', icon: <Award size={16} /> },
    { label: 'Scholarships', value: 'Education', icon: <BookOpen size={16} /> },
    { label: 'Skill Dev', value: 'skill', icon: <Wrench size={16} /> },
    { label: 'Startup', value: 'startup', icon: <Rocket size={16} /> },
];

const StudentSchemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const res = await getStudentSchemes();
                setSchemes(res.data);
                setFiltered(res.data);
            } catch (error) {
                console.error('Error fetching student schemes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSchemes();
    }, []);

    useEffect(() => {
        let result = schemes;

        if (activeCategory !== 'all') {
            result = result.filter(s =>
                s.eligibility.sectors.includes(activeCategory) ||
                s.eligibility.businessType.includes(activeCategory)
            );
        }

        if (searchQuery.trim()) {
            result = result.filter(s =>
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFiltered(result);
    }, [activeCategory, searchQuery, schemes]);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HERO */}
           <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-4">
                        <GraduationCap size={48} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Student Schemes</h1>
                    <p className="text-green-100 text-lg max-w-2xl mx-auto">
                        Scholarships, education loans, skill programs and startup grants 
                        made specially for students across India.
                    </p>
                    <div className="mt-4 bg-green-700 inline-block px-4 py-2 rounded-full text-sm font-semibold">
                        {schemes.length} Schemes Available
                    </div>
                </div>
            </section>

            {/* SEARCH + FILTER */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                
                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search student schemes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex gap-3 flex-wrap mb-8">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.value}
                            onClick={() => setActiveCategory(cat.value)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition ${
                                activeCategory === cat.value
    ? 'bg-blue-600 text-white'
    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400'
                            }`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Results */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading schemes...</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No schemes found.</div>
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