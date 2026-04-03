import express from 'express';
import {
    registerUser,
    loginUser,
    getProfile,
    addFavorite,
    removeFavorite,
    getFavorites
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ============================================
// Public Routes (No login required)
// ============================================
router.post('/register', registerUser);
router.post('/login', loginUser);

// ============================================
// Protected Routes (Login required)
// ============================================
router.get('/profile', protect, getProfile);
router.get('/favorites', protect, getFavorites);
router.post('/favorites/add', protect, addFavorite);
router.post('/favorites/remove', protect, removeFavorite);

export default router;