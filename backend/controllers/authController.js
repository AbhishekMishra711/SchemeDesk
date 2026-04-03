import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// ============================================
// JWT Token Generate Karo
// ============================================
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'schemedesk_secret_key_2024',
        { expiresIn: '30d' }
    );
};


// ============================================
// 1. REGISTER - Naya User Banao
// ============================================
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all fields'
            });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                favorites: user.favorites,
                token: token
            }
        });

    } catch (error) {
        console.log('Register Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


// ============================================
// 2. LOGIN - User Login Karo
// ============================================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Login successful!',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                favorites: user.favorites,
                token: token
            }
        });

    } catch (error) {
        console.log('Login Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


// ============================================
// 3. GET PROFILE - User Details Lao
// ============================================
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('favorites');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: user
        });

    } catch (error) {
        console.log('Profile Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


// ============================================
// 4. ADD FAVORITE - Scheme Save Karo
// ============================================
export const addFavorite = async (req, res) => {
    try {
        const { schemeId } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        
        // Check if already in favorites
        if (user.favorites.includes(schemeId)) {
            return res.status(400).json({
                success: false,
                message: 'Scheme already in favorites'
            });
        }

        // Add to favorites
        user.favorites.push(schemeId);
        await user.save();

        res.json({
            success: true,
            message: 'Scheme added to favorites!',
            favorites: user.favorites
        });

    } catch (error) {
        console.log('Add Favorite Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


// ============================================
// 5. REMOVE FAVORITE - Scheme Hatao
// ============================================
export const removeFavorite = async (req, res) => {
    try {
        const { schemeId } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        
        // Remove from favorites
        user.favorites = user.favorites.filter(
            fav => fav.toString() !== schemeId
        );
        await user.save();

        res.json({
            success: true,
            message: 'Scheme removed from favorites!',
            favorites: user.favorites
        });

    } catch (error) {
        console.log('Remove Favorite Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


// ============================================
// 6. GET FAVORITES - Saved Schemes Lao
// ============================================
export const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('favorites');

        res.json({
            success: true,
            count: user.favorites.length,
            data: user.favorites
        });

    } catch (error) {
        console.log('Get Favorites Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};