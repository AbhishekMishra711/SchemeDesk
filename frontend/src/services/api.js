import axios from 'axios';

// ============================================
// Backend ka URL
// ============================================
const API_URL = 'http://localhost:5000/api';

// ============================================
// Axios instance banao (pre-configured)
// ============================================                                                 
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// ============================================
// Request Interceptor - Token add karo
// ============================================
api.interceptors.request.use((config) => {
    const user = localStorage.getItem('user');
    if (user) {
        const { token } = JSON.parse(user);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ============================================
// SCHEME APIs
// ============================================

// 1. Saari schemes laao
export const getAllSchemes = async () => {
    const response = await api.get('/schemes');
    return response.data;
};

// 2. Ek scheme ki detail laao
export const getSchemeById = async (id) => {
    const response = await api.get(`/schemes/${id}`);
    return response.data;
};

// 3. Schemes search karo
export const searchSchemes = async (query) => {
    const response = await api.get(`/schemes/search?q=${query}`);
    return response.data;
};

// 4. Matching schemes laao
export const matchSchemes = async (userDetails) => {
    const response = await api.post('/schemes/match', userDetails);
    return response.data;
};

// ============================================
// AUTH APIs
// ============================================

// 5. Register
export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

// 6. Login
export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

// 7. Get Profile
export const getProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
};

// 8. Get Favorites
export const getFavorites = async () => {
    const response = await api.get('/auth/favorites');
    return response.data;
};

// 9. Add Favorite
export const addFavorite = async (schemeId) => {
    const response = await api.post('/auth/favorites/add', { schemeId });
    return response.data;
};

// 10. Remove Favorite
export const removeFavorite = async (schemeId) => {
    const response = await api.post('/auth/favorites/remove', { schemeId });
    return response.data;
};

export default api;