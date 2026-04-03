import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ============================================
// User ka Structure (Schema)
// ============================================
const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },

    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scheme'
    }]

}, { timestamps: true });


// ============================================
// Password Hash Karo (Save se pehle)
// ============================================
userSchema.pre('save', async function() {
    // Agar password change nahi hua toh skip
    if (!this.isModified('password')) {
        return;
    }
    
    // Password hash karo
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// ============================================
// Password Match Check Karo
// ============================================
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


// ============================================
// Model Export
// ============================================
const User = mongoose.model('User', userSchema);
export default User;