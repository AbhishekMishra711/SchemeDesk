const schemes = [
    // ============================================
    // SCHEME 1: Startup India Seed Fund
    // ============================================
    {
        name: "Startup India Seed Fund Scheme",
        description: "Financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization. This scheme supports early-stage startups that are in the ideation and development phase.",
        ministry: "Department for Promotion of Industry and Internal Trade (DPIIT)",
        eligibility: {
            minAge: 18,
            maxAge: 45,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 2500000,
            businessType: ["Startup"],
            sectors: ["Technology", "Manufacturing", "Healthcare", "Agriculture", "Education", "Services"],
            educationRequired: "None"
        },
        benefits: "Upto Rs. 20 Lakh for validation of Proof of Concept, prototype development. Upto Rs. 50 Lakh for market entry, commercialization.",
        howToApply: "Apply through Startup India portal. Register your startup on startupindia.gov.in and apply through recognized incubators.",
        documentsRequired: [
            "DPIIT Recognition Certificate",
            "Incorporation Certificate",
            "PAN Card of Company",
            "Business Plan",
            "Bank Account Details",
            "Aadhaar Card of Founders"
        ],
        websiteLink: "https://seedfund.startupindia.gov.in",
        isActive: true
    },

    // ============================================
    // SCHEME 2: PM Mudra Yojana
    // ============================================
    {
        name: "Pradhan Mantri Mudra Yojana (PMMY)",
        description: "Provides loans upto 10 lakh to non-corporate, non-farm small/micro enterprises. Loans are given under three categories - Shishu, Kishore, and Tarun based on the stage of growth and funding needs.",
        ministry: "Ministry of Finance",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 1000000,
            businessType: ["Startup", "Existing"],
            sectors: ["Manufacturing", "Trading", "Services", "Agriculture"],
            educationRequired: "None"
        },
        benefits: "Shishu: Loan upto Rs. 50,000. Kishore: Loan from Rs. 50,001 to Rs. 5,00,000. Tarun: Loan from Rs. 5,00,001 to Rs. 10,00,000. No collateral required.",
        howToApply: "Visit nearest bank branch (Public Sector Bank, Private Bank, RRB, MFI) with required documents and business plan.",
        documentsRequired: [
            "Aadhaar Card",
            "PAN Card",
            "Passport Size Photos",
            "Business Plan",
            "Proof of Business Address",
            "Category Certificate (if applicable)"
        ],
        websiteLink: "https://www.mudra.org.in",
        isActive: true
    },

    // ============================================
    // SCHEME 3: Stand Up India
    // ============================================
    {
        name: "Stand Up India Scheme",
        description: "Facilitates bank loans between Rs. 10 Lakh and Rs. 1 Crore to at least one SC/ST borrower and one Woman borrower per bank branch for setting up a greenfield enterprise in manufacturing, services, or trading sector.",
        ministry: "Ministry of Finance",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["Female", "Male", "Other"],
            category: ["SC", "ST"],
            states: ["All India"],
            maxIncome: 5000000,
            businessType: ["Startup"],
            sectors: ["Manufacturing", "Services", "Trading"],
            educationRequired: "None"
        },
        benefits: "Loan between Rs. 10 Lakh to Rs. 1 Crore. Covers 75% of project cost. Repayment period upto 7 years with maximum moratorium period of 18 months.",
        howToApply: "Apply online through standupmitra.in portal or visit nearest bank branch.",
        documentsRequired: [
            "Aadhaar Card",
            "PAN Card",
            "Caste Certificate (SC/ST)",
            "Business Plan",
            "Address Proof",
            "Bank Statements",
            "IT Returns (if any)"
        ],
        websiteLink: "https://www.standupmitra.in",
        isActive: true
    },

    // ============================================
    // SCHEME 4: PMEGP
    // ============================================
    {
        name: "Prime Minister Employment Generation Programme (PMEGP)",
        description: "Credit-linked subsidy programme for generation of employment opportunities through establishment of micro enterprises in non-farm sector by helping traditional artisans and unemployed youth.",
        ministry: "Ministry of Micro, Small and Medium Enterprises",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 1200000,
            businessType: ["Startup"],
            sectors: ["Manufacturing", "Services"],
            educationRequired: "8th Pass"
        },
        benefits: "Subsidy of 25% of project cost in Urban areas and 35% in Rural areas for General category. For SC/ST/OBC/Women/Minorities: 35% in Urban and 45% in Rural areas. Maximum project cost: Rs. 50 Lakh (Manufacturing) and Rs. 20 Lakh (Services).",
        howToApply: "Apply online through kviconline.gov.in portal. Applications processed through KVIC, State KVIB, and District Industries Centre (DIC).",
        documentsRequired: [
            "Aadhaar Card",
            "PAN Card",
            "Educational Certificate (8th Pass)",
            "Project Report",
            "Passport Size Photo",
            "Category Certificate (if applicable)",
            "Rural Area Certificate (if applicable)"
        ],
        websiteLink: "https://www.kviconline.gov.in",
        isActive: true
    },

    // ============================================
    // SCHEME 5: Atal Innovation Mission
    // ============================================
    {
        name: "Atal Innovation Mission (AIM)",
        description: "NITI Aayog's flagship initiative to promote innovation and entrepreneurship across the country. Supports establishment of Atal Incubation Centres and provides funding to innovative startups.",
        ministry: "NITI Aayog",
        eligibility: {
            minAge: 18,
            maxAge: 50,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 5000000,
            businessType: ["Startup"],
            sectors: ["Technology", "Healthcare", "Education", "Agriculture", "Manufacturing"],
            educationRequired: "Graduate"
        },
        benefits: "Grant-in-aid of upto Rs. 10 Crore for Atal Incubation Centers. Scale-up support for established incubators. Innovation challenges with cash prizes.",
        howToApply: "Apply through aim.gov.in portal. Submit detailed proposal for incubation or innovation project.",
        documentsRequired: [
            "Company Registration",
            "PAN Card",
            "Detailed Project Proposal",
            "Team Details",
            "Financial Projections",
            "Proof of Innovation"
        ],
        websiteLink: "https://aim.gov.in",
        isActive: true
    },

    // ============================================
    // SCHEME 6: CGTMSE
    // ============================================
    {
        name: "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
        description: "Provides collateral-free credit facility to micro and small enterprises. The guarantee cover ranges from 75% to 85% of the sanctioned amount of the credit facility.",
        ministry: "Ministry of Micro, Small and Medium Enterprises",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 10000000,
            businessType: ["Startup", "Existing"],
            sectors: ["Manufacturing", "Services", "Technology"],
            educationRequired: "None"
        },
        benefits: "Collateral-free loan upto Rs. 5 Crore. Guarantee cover of 75% to 85%. Available for both new and existing enterprises.",
        howToApply: "Apply through any scheduled commercial bank, RRB, NSIC, SIDBI, or other eligible lending institutions.",
        documentsRequired: [
            "Business Registration",
            "PAN Card",
            "Aadhaar Card",
            "Business Plan",
            "Bank Statements",
            "Udyam Registration Certificate"
        ],
        websiteLink: "https://www.cgtmse.in",
        isActive: true
    },

    // ============================================
    // SCHEME 7: Digital India Programme
    // ============================================
    {
        name: "Digital India Programme - Startup Support",
        description: "Support for technology startups building digital solutions. Includes funding support, mentorship, and access to government procurement. Focus on building digital infrastructure and digital literacy.",
        ministry: "Ministry of Electronics and Information Technology",
        eligibility: {
            minAge: 18,
            maxAge: 45,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 5000000,
            businessType: ["Startup"],
            sectors: ["Technology"],
            educationRequired: "Graduate"
        },
        benefits: "Funding support for digital solutions. Access to government mentors. Opportunity for government procurement. Cloud computing credits and technical support.",
        howToApply: "Register on MeitY Startup Hub portal and apply for specific programs and challenges.",
        documentsRequired: [
            "Company Registration",
            "DPIIT Recognition",
            "PAN Card",
            "Technical Proposal",
            "Product Demo",
            "Team Qualifications"
        ],
        websiteLink: "https://www.digitalindia.gov.in",
        isActive: true
    },

    // ============================================
    // SCHEME 8: Mahila Udyam Nidhi
    // ============================================
    {
        name: "Mahila Udyam Nidhi Scheme",
        description: "Exclusively for women entrepreneurs to set up new small-scale ventures or upgrade existing ones. Provides soft loans to women who want to start their own business in the small-scale sector.",
        ministry: "Small Industries Development Bank of India (SIDBI)",
        eligibility: {
            minAge: 18,
            maxAge: 55,
            gender: ["Female"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 1000000,
            businessType: ["Startup", "Existing"],
            sectors: ["Manufacturing", "Services", "Trading", "Agriculture"],
            educationRequired: "None"
        },
        benefits: "Loan upto Rs. 10 Lakh. Soft loan with low interest rate. Repayment period of 10 years including moratorium period of 5 years.",
        howToApply: "Apply through SIDBI or any nationalized bank. Submit business plan and required documents.",
        documentsRequired: [
            "Aadhaar Card",
            "PAN Card",
            "Address Proof",
            "Business Plan",
            "Passport Size Photos",
            "Bank Account Details"
        ],
        websiteLink: "https://www.sidbi.in",
        isActive: true
    },

    // ============================================
    // SCHEME 9: ASPIRE Scheme
    // ============================================
    {
        name: "A Scheme for Promotion of Innovation, Rural Industry and Entrepreneurship (ASPIRE)",
        description: "Promotes innovation and rural entrepreneurship through incubation centres. Creates new jobs and reduces unemployment through setting up network of technology and incubation centres.",
        ministry: "Ministry of Micro, Small and Medium Enterprises",
        eligibility: {
            minAge: 18,
            maxAge: 60,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 800000,
            businessType: ["Startup"],
            sectors: ["Agriculture", "Manufacturing", "Services"],
            educationRequired: "None"
        },
        benefits: "Financial support for setting up Livelihood Business Incubators (LBI). Technology Business Incubators (TBI) in PPP mode. Fund of Funds for startups.",
        howToApply: "Apply through MSME portal or contact nearest District Industries Centre.",
        documentsRequired: [
            "Aadhaar Card",
            "PAN Card",
            "Business Proposal",
            "Rural Area Proof",
            "Bank Account Details"
        ],
        websiteLink: "https://aspire.msme.gov.in",
        isActive: true
    },

    // ============================================
    // SCHEME 10: Dairy Entrepreneurship Development
    // ============================================
    {
        name: "Dairy Entrepreneurship Development Scheme (DEDS)",
        description: "Promotes setting up of modern dairy farms and infrastructure for production, procurement, preservation, transportation, processing and marketing of milk. Generates self-employment and infrastructure for dairy sector.",
        ministry: "Department of Animal Husbandry and Dairying",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 1500000,
            businessType: ["Startup", "Existing"],
            sectors: ["Agriculture"],
            educationRequired: "None"
        },
        benefits: "Subsidy of 25% for General category and 33.33% for SC/ST category. Applicable for dairy farm, milk collection, chilling and transportation facilities.",
        howToApply: "Apply through NABARD portal or contact nearest bank branch participating in the scheme.",
        documentsRequired: [
            "Aadhaar Card",
            "PAN Card",
            "Land Documents",
            "Project Report",
            "Bank Account Details",
            "Category Certificate"
        ],
        websiteLink: "https://www.nabard.org",
        isActive: true
    },

    // ============================================
    // SCHEME 11: PM Kaushal Vikas Yojana
    // ============================================
    {
        name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
        description: "Skill development initiative to enable Indian youth to take up industry-relevant skill training that helps them in securing a better livelihood. Provides free short-term training and certification.",
        ministry: "Ministry of Skill Development and Entrepreneurship",
        eligibility: {
            minAge: 15,
            maxAge: 45,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 500000,
            businessType: ["Startup", "Existing"],
            sectors: ["Technology", "Manufacturing", "Services", "Agriculture", "Healthcare", "Education", "Trading"],
            educationRequired: "None"
        },
        benefits: "Free skill training in 300+ job roles. Industry recognized certification. Monetary reward of Rs. 8000 on successful certification. Placement assistance after training.",
        howToApply: "Register on pmkvyofficial.org or visit nearest PMKVY Training Centre (TC).",
        documentsRequired: [
            "Aadhaar Card",
            "Bank Account Details",
            "Passport Size Photo",
            "Educational Certificate (if any)"
        ],
        websiteLink: "https://www.pmkvyofficial.org",
        isActive: true
    },

    // ============================================
    // SCHEME 12: Startup India Registration
    // ============================================
    {
        name: "Startup India DPIIT Recognition",
        description: "DPIIT recognition for startups providing various benefits including tax exemptions, easier compliance, IPR fast-tracking, and easier public procurement. Foundation for accessing multiple government startup schemes.",
        ministry: "Department for Promotion of Industry and Internal Trade (DPIIT)",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 10000000,
            businessType: ["Startup"],
            sectors: ["Technology", "Manufacturing", "Services", "Agriculture", "Healthcare", "Education", "Trading"],
            educationRequired: "None"
        },
        benefits: "Income tax exemption for 3 consecutive years. Exemption from Angel Tax. Self-certification for 6 labour laws. Fast-tracked patent application. Easy winding up of company.",
        howToApply: "Register on startupindia.gov.in portal with company incorporation details and innovation description.",
        documentsRequired: [
            "Certificate of Incorporation",
            "PAN Card of Entity",
            "Description of Innovation",
            "Director/Partner Details"
        ],
        websiteLink: "https://www.startupindia.gov.in",
        isActive: true
    },

    // ============================================
    // SCHEME 13: National SC/ST Hub
    // ============================================
    {
        name: "National SC/ST Hub Scheme",
        description: "Provides professional support to SC/ST entrepreneurs to fulfil the obligations under Central Government procurement policy. Aims to strengthen market access and develop SC/ST enterprises.",
        ministry: "Ministry of Micro, Small and Medium Enterprises",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["Male", "Female", "Other"],
            category: ["SC", "ST"],
            states: ["All India"],
            maxIncome: 5000000,
            businessType: ["Startup", "Existing"],
            sectors: ["Manufacturing", "Services", "Trading", "Technology"],
            educationRequired: "None"
        },
        benefits: "Special market access for SC/ST entrepreneurs. Vendor development programmes. Capacity building and training. Financial and technical support.",
        howToApply: "Register on scsthub.in portal and apply for vendor development programmes.",
        documentsRequired: [
            "Aadhaar Card",
            "Caste Certificate (SC/ST)",
            "Business Registration",
            "PAN Card",
            "Udyam Registration"
        ],
        websiteLink: "https://www.scsthub.in",
        isActive: true
    },

    // ============================================
    // SCHEME 14: PM Vishwakarma Yojana
    // ============================================
    {
        name: "PM Vishwakarma Yojana",
        description: "End-to-end support to traditional artisans and craftspeople through recognition, skill upgradation, toolkit incentive, credit support, and market linkage. Covers 18 traditional trades.",
        ministry: "Ministry of Micro, Small and Medium Enterprises",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 300000,
            businessType: ["Existing"],
            sectors: ["Manufacturing", "Services"],
            educationRequired: "None"
        },
        benefits: "Collateral free loan: First tranche of Rs. 1 Lakh, Second tranche of Rs. 2 Lakh at 5% interest rate. Free skill training with Rs. 500/day stipend. Toolkit incentive of Rs. 15,000. Digital transaction incentive.",
        howToApply: "Register through CSC centres or pmvishwakarma.gov.in portal with Aadhaar-based biometric verification.",
        documentsRequired: [
            "Aadhaar Card",
            "Ration Card",
            "Bank Account Details",
            "Mobile Number linked with Aadhaar",
            "Trade Verification by Gram Panchayat/ULB"
        ],
        websiteLink: "https://pmvishwakarma.gov.in",
        isActive: true
    },

    // ============================================
    // SCHEME 15: Fund of Funds for Startups
    // ============================================
    {
        name: "Fund of Funds for Startups (FFS)",
        description: "SIDBI managed Fund of Funds with a corpus of Rs. 10,000 crore. Does not directly invest in startups but provides capital to SEBI registered Alternative Investment Funds (AIFs) who in turn invest in startups.",
        ministry: "Department for Promotion of Industry and Internal Trade (DPIIT)",
        eligibility: {
            minAge: 18,
            maxAge: 50,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 10000000,
            businessType: ["Startup"],
            sectors: ["Technology", "Healthcare", "Education", "Agriculture", "Manufacturing", "Services"],
            educationRequired: "None"
        },
        benefits: "Access to venture capital funding through SEBI registered AIFs. Total corpus of Rs. 10,000 Crore. Catalyzes private investment in startup ecosystem.",
        howToApply: "Approach SEBI registered AIFs that have received commitment from FFS. List available on SIDBI website.",
        documentsRequired: [
            "DPIIT Recognition Certificate",
            "Company Incorporation Certificate",
            "Business Plan",
            "Financial Statements",
            "Pitch Deck",
            "Team Details"
        ],
        websiteLink: "https://www.sidbi.in",
        isActive: true
    },

    // ============================================
    // SCHEME 16: Khadi Gramodyog
    // ============================================
    {
        name: "Khadi and Village Industries Commission (KVIC) Schemes",
        description: "Promotes khadi and village industries for providing employment in rural areas. Supports traditional industries with modern technology, training and marketing support.",
        ministry: "Ministry of Micro, Small and Medium Enterprises",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 500000,
            businessType: ["Startup", "Existing"],
            sectors: ["Manufacturing", "Agriculture"],
            educationRequired: "None"
        },
        benefits: "Subsidy upto 30% for Rural areas and 25% for Urban areas. Free training in khadi spinning and weaving. Marketing support through KVIC outlets. Raw material supply at subsidized rates.",
        howToApply: "Contact nearest KVIC office or apply through kviconline.gov.in portal.",
        documentsRequired: [
            "Aadhaar Card",
            "PAN Card",
            "Address Proof",
            "Project Report",
            "Bank Account Details"
        ],
        websiteLink: "https://www.kviconline.gov.in",
        isActive: true
    },

    // ============================================
    // SCHEME 17: Udyam Registration
    // ============================================
    {
        name: "Udyam Registration (MSME Registration)",
        description: "Free online registration for Micro, Small and Medium Enterprises. Udyam Registration is mandatory for availing benefits under various MSME schemes and government procurement preferences.",
        ministry: "Ministry of Micro, Small and Medium Enterprises",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 10000000,
            businessType: ["Startup", "Existing"],
            sectors: ["Manufacturing", "Services", "Trading", "Technology", "Agriculture", "Healthcare", "Education"],
            educationRequired: "None"
        },
        benefits: "Free MSME registration. Access to all MSME government schemes. Priority in government procurement. Collateral free loans from banks. Protection against delayed payments.",
        howToApply: "Register free on udyamregistration.gov.in with Aadhaar number. Completely online and paperless.",
        documentsRequired: [
            "Aadhaar Card",
            "PAN Card",
            "Bank Account Details",
            "Business Address",
            "NIC Code of Business Activity"
        ],
        websiteLink: "https://udyamregistration.gov.in",
        isActive: true
    },

    // ============================================
    // SCHEME 18: NABARD Refinance Schemes
    // ============================================
    {
        name: "NABARD Rural Entrepreneurship Schemes",
        description: "NABARD provides refinance support and direct lending for rural entrepreneurs in agriculture and allied sectors. Promotes sustainable rural development through financial inclusion.",
        ministry: "National Bank for Agriculture and Rural Development",
        eligibility: {
            minAge: 21,
            maxAge: 60,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 800000,
            businessType: ["Startup", "Existing"],
            sectors: ["Agriculture", "Manufacturing"],
            educationRequired: "None"
        },
        benefits: "Low interest rate loans for rural projects. Capital subsidy upto 33%. Training and capacity building. Market linkage support.",
        howToApply: "Apply through participating banks or contact nearest NABARD regional office.",
        documentsRequired: [
            "Aadhaar Card",
            "PAN Card",
            "Land Documents",
            "Project Report",
            "Rural Address Proof",
            "Bank Account Details"
        ],
        websiteLink: "https://www.nabard.org",
        isActive: true
    },

    // ============================================
    // SCHEME 19: Textile Sector Support
    // ============================================
    {
        name: "PM MITRA - Mega Integrated Textile Region",
        description: "Development of integrated large scale textile parks with world-class infrastructure. Supports entire textile value chain from spinning to garmenting at one location.",
        ministry: "Ministry of Textiles",
        eligibility: {
            minAge: 18,
            maxAge: 60,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["Tamil Nadu", "Telangana", "Gujarat", "Madhya Pradesh", "Uttar Pradesh", "Karnataka", "Maharashtra"],
            maxIncome: 5000000,
            businessType: ["Startup", "Existing"],
            sectors: ["Manufacturing"],
            educationRequired: "None"
        },
        benefits: "World class infrastructure at subsidized rates. Employment support of Rs. 50,000 per employee for 3 years. 50% subsidy on capital investment upto Rs. 10 Crore.",
        howToApply: "Apply through respective PM MITRA park SPV or Ministry of Textiles portal.",
        documentsRequired: [
            "Business Registration",
            "PAN Card",
            "Business Plan",
            "Investment Details",
            "Land/Space Requirements"
        ],
        websiteLink: "https://www.texmin.nic.in",
        isActive: true
    },

    // ============================================
    // SCHEME 20: Agri-Business Support
    // ============================================
    {
        name: "Agriculture Infrastructure Fund (AIF)",
        description: "Central Government scheme for financing infrastructure for farm-gate and aggregation points. Provides medium-long term debt financing for post-harvest management and community farming assets.",
        ministry: "Ministry of Agriculture and Farmers Welfare",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 2000000,
            businessType: ["Startup", "Existing"],
            sectors: ["Agriculture"],
            educationRequired: "None"
        },
        benefits: "Interest subvention of 3% per annum upto Rs. 2 Crore loan. Credit guarantee coverage under CGTMSE. Loans for cold storage, warehousing, sorting and grading units.",
        howToApply: "Apply through agriinfra.dac.gov.in portal or visit nearest bank branch.",
        documentsRequired: [
            "Aadhaar Card",
            "PAN Card",
            "Land Documents",
            "Project Report",
            "Bank Account Details",
            "Farmer/FPO Registration"
        ],
        websiteLink: "https://agriinfra.dac.gov.in",
        isActive: true
    }
];

export default schemes;