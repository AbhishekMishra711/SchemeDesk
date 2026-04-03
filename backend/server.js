
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


import schemeRoutes from './routes/schemeRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Express.js mein
app.use((req, res, next) => {
  res.setHeader("Bypass-Tunnel-Reminder", "true");
  next();
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 
        message: 'SchemeDesk API is running!',
        status: 'success',
        endpoints: {
            schemes: '/api/schemes',
            auth: '/api/auth'
        }
    });
});


app.use('/api/schemes', schemeRoutes);
app.use('/api/auth', authRoutes);

//mongodb connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/schemedesk')
    .then(() => {
        console.log('MongoDB Connected Successfully!');
    })
    .catch((err) => {
        console.log('MongoDB Connection Failed:', err.message);
    });

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});