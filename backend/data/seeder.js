import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scheme from '../models/Scheme.js';
import schemes from './schemes.js';

// ============================================
// .env file load karo
// ============================================
dotenv.config();

// ============================================
// Database se connect karo
// ============================================
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/schemedesk')
    .then(() => {
        console.log('MongoDB Connected for Seeding...');
    })
    .catch((err) => {
        console.log('Connection Failed:', err.message);
        process.exit(1);
    });

// ============================================
// Data Import karne ka function
// ============================================
const importData = async () => {
    try {
        // Pehle purana data delete karo
        await Scheme.deleteMany();
        console.log('Old data deleted!');

        // Naya data daalo
        await Scheme.insertMany(schemes);
        console.log(`${schemes.length} schemes added to database!`);

        console.log('Seeding Complete!');
        process.exit();
    } catch (error) {
        console.log('Error:', error.message);
        process.exit(1);
    }
};

// ============================================
// Script run karo
// ============================================
importData();