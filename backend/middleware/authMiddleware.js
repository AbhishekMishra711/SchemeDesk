import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ============================================
// Protect Route - Login Required
// ============================================
export const protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // No token found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, please login'
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET || 'schemedesk_secret_key_2024'
        );

        // Get user from token
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Not authorized, token invalid'
        });
    }
};