import express from 'express';
import {
    getAllSchemes,
    getSchemeById,
    matchSchemes,
    searchSchemes,
    getStudentSchemes
} from '../controllers/schemeController.js';

// ============================================
// Router banao
// ============================================
const router = express.Router();

// ============================================
// Routes Define Karo
// ============================================

// GET /api/schemes - Saari schemes
router.get('/', getAllSchemes);

// GET /api/schemes/search?q=mudra - Search schemes
router.get('/search', searchSchemes);

// GET /api/schemes/student - Student schemes
router.get('/student', getStudentSchemes);

// GET /api/schemes/:id - Ek scheme by ID
router.get('/:id', getSchemeById);

// POST /api/schemes/match - Matching schemes
router.post('/match', matchSchemes);

// ============================================
// Export karo
// ============================================
export default router;