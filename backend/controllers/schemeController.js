import Scheme from '../models/Scheme.js';

// ============================================
// 1. GET ALL SCHEMES - Saari schemes dikhao
// ============================================
export const getAllSchemes = async (req, res) => {
    try {
        // Database se saari schemes laao
        const schemes = await Scheme.find({ isActive: true });
        
        res.json({
            success: true,
            count: schemes.length,
            data: schemes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// ============================================
// 2. GET SCHEME BY ID - Ek scheme ki detail
// ============================================
export const getSchemeById = async (req, res) => {
    try {
        // URL se ID nikalo aur wo scheme dhundho
        const scheme = await Scheme.findById(req.params.id);
        
        // Agar scheme nahi mili
        if (!scheme) {
            return res.status(404).json({
                success: false,
                message: 'Scheme not found'
            });
        }
        
        res.json({
            success: true,
            data: scheme
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// ============================================
// 3. MATCH SCHEMES - User ke liye eligible schemes
// ============================================
export const matchSchemes = async (req, res) => {
    try {
        // User ki details request body se nikalo
        const { 
            age, 
            gender, 
            category, 
            state, 
            income, 
            businessType, 
            sector 
        } = req.body;

        // Validation - required fields check karo
        if (!age || !gender || !category || !state || !income || !businessType || !sector) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Saari active schemes laao
        const allSchemes = await Scheme.find({ isActive: true });

        // Filter karo - matching schemes dhundho
        const matchedSchemes = allSchemes.filter(scheme => {
            const eligibility = scheme.eligibility;

            // -------- AGE CHECK --------
            // User ki age scheme ke min-max range mein honi chahiye
            const ageMatch = age >= eligibility.minAge && age <= eligibility.maxAge;

            // -------- GENDER CHECK --------
            // User ka gender scheme mein allowed hona chahiye
            const genderMatch = eligibility.gender.includes(gender) || 
                               eligibility.gender.includes('All');

            // -------- CATEGORY CHECK --------
            // User ki category scheme mein included honi chahiye
            const categoryMatch = eligibility.category.includes(category) || 
                                 eligibility.category.includes('All');

            // -------- STATE CHECK --------
            // User ka state covered hona chahiye
            const stateMatch = eligibility.states.includes(state) || 
                              eligibility.states.includes('All India');

            // -------- INCOME CHECK --------
            // User ki income max limit se kam honi chahiye
            const incomeMatch = income <= eligibility.maxIncome;

            // -------- BUSINESS TYPE CHECK --------
            // User ka business type match hona chahiye
            const businessMatch = eligibility.businessType.includes(businessType) || 
                                 eligibility.businessType.includes('All');

            // -------- SECTOR CHECK --------
            // User ka sector covered hona chahiye
            const sectorMatch = eligibility.sectors.includes(sector) || 
                               eligibility.sectors.includes('All');

            // -------- FINAL CHECK --------
            // SAB conditions true honi chahiye
            return ageMatch && genderMatch && categoryMatch && 
                   stateMatch && incomeMatch && businessMatch && sectorMatch;
        });

        // Response bhejo
        res.json({
            success: true,
            message: `Found ${matchedSchemes.length} matching schemes for you!`,
            userDetails: {
                age,
                gender,
                category,
                state,
                income,
                businessType,
                sector
            },
            count: matchedSchemes.length,
            data: matchedSchemes
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// ============================================
// 4. SEARCH SCHEMES - Name se search karo
// ============================================
export const searchSchemes = async (req, res) => {
    try {
        // Query parameter se search term nikalo
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Please provide search query'
            });
        }

        // Name ya description mein search karo (case-insensitive)
        const schemes = await Scheme.find({
            isActive: true,
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        });

        res.json({
            success: true,
            searchTerm: q,
            count: schemes.length,
            data: schemes
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};