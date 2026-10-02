import axios from 'axios';

// ============================================
// Backend ka URL (with reliable fallback)
// ============================================
const API_URL = import.meta.env.VITE_API_URL || import.meta.env.API || "/api";

// ============================================
// Axios instance banao (pre-configured)
// ============================================                                                 
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

// ============================================
// Request Interceptor - Token add karo
// ============================================
api.interceptors.request.use(
    (config) => {
        try {
            const user = localStorage.getItem('user');
            if (user) {
                const parsed = JSON.parse(user);
                if (parsed?.token) {
                    config.headers.Authorization = `Bearer ${parsed.token}`;
                }
            }
        } catch (err) {
            console.error('Error reading auth token:', err);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ============================================
// Response Interceptor - Handle common errors
// ============================================
api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

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
    const response = await api.get(`/schemes/search?q=${encodeURIComponent(query)}`);
    return response.data;
};

// 4. Matching schemes laao
export const matchSchemes = async (userDetails) => {
    const response = await api.post('/schemes/match', userDetails);
    return response.data;
};

// 5. Student schemes laao
export const getStudentSchemes = async () => {
    const response = await api.get('/schemes/student');
    return response.data;
};

// ============================================
// AUTH APIs
// ============================================

// 6. Register
export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

// 7. Login
export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

// 8. Get Profile
export const getProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
};

// 9. Get Favorites
export const getFavorites = async () => {
    const response = await api.get('/auth/favorites');
    return response.data;
};

// 10. Add Favorite
export const addFavorite = async (schemeId) => {
    const response = await api.post('/auth/favorites/add', { schemeId });
    return response.data;
};

// 11. Remove Favorite
export const removeFavorite = async (schemeId) => {
    const response = await api.post('/auth/favorites/remove', { schemeId });
    return response.data;
};

export default api;