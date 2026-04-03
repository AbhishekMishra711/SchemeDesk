import mongoose from 'mongoose';

// ============================================
// Scheme ka Structure (Format) define karo
// ============================================
const schemeSchema = new mongoose.Schema({

    // ---------- Basic Details ----------
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    ministry: {
        type: String,
        required: true
    },

    // ---------- Eligibility Criteria ----------
    eligibility: {
        minAge: {
            type: Number,
            default: 0
        },
        maxAge: {
            type: Number,
            default: 100
        },
        gender: {
            type: [String],
            default: ['Male', 'Female', 'Other']
        },
        category: {
            type: [String],
            default: ['General', 'SC', 'ST', 'OBC']
        },
        states: {
            type: [String],
            default: ['All India']
        },
        maxIncome: {
            type: Number,
            default: 10000000
        },
        businessType: {
            type: [String],
            default: ['Startup', 'Existing']
        },
        sectors: {
            type: [String],
            default: ['All']
        },
        educationRequired: {
            type: String,
            default: 'None'
        }
    },

    // ---------- Benefits ----------
    benefits: {
        type: String,
        required: true
    },

    // ---------- How to Apply ----------
    howToApply: {
        type: String,
        default: 'Visit official website'
    },

    // ---------- Documents Required ----------
    documentsRequired: {
        type: [String],
        default: []
    },

    // ---------- Official Website Link ----------
    websiteLink: {
        type: String,
        default: ''
    },

    // ---------- Scheme Active Hai Ya Nahi ----------
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });


// ============================================
// Model banao aur Export karo
// ============================================
const Scheme = mongoose.model('Scheme', schemeSchema);

export default Scheme;