import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/navbar';

// Pages
import Home from './pages/home';
import AllSchemes from './pages/allSchemes';
import SchemeDetail from './pages/schemeDetail';
import CheckEligibility from './pages/checkEligibility';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favorites from './pages/Favorites';
import StudentSchemes from './pages/StudentSchemes';

function App() {
    return (
        <AuthProvider>
            <Router>
                {/* Navbar - Har page pe dikhega */}
                <Navbar />

                {/* Routes - URL ke hisaab se page dikhao */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/schemes" element={<AllSchemes />} />
                    <Route path="/schemes/:id" element={<SchemeDetail />} />
                    <Route path="/check-eligibility" element={<CheckEligibility />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/student-schemes" element={<StudentSchemes />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;