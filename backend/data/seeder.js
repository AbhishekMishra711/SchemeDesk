import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scheme from '../models/Scheme.js';
import schemes from './schemes.js';
import studentSchemes from './studentSchemes.js';

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
        await Scheme.insertMany(schemes);
await Scheme.insertMany(studentSchemes);
console.log(`${schemes.length + studentSchemes.length} total schemes added!`);
        console.log('Old data deleted!');


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