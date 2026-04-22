const studentSchemes = [
    {
        name: "National Scholarship Portal (NSP)",
        description: "Central platform for scholarships for students from Class 1 to Post Graduation. Covers pre-matric, post-matric and merit-cum-means scholarships for SC/ST/OBC and minority students across India.",
        ministry: "Ministry of Education",
        eligibility: {
            minAge: 6,
            maxAge: 30,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 250000,
            businessType: ["Student"],
            sectors: ["Education"],
            educationRequired: "School/College Enrollment"
        },
        benefits: "Scholarship amount ranges from ₹1,000 to ₹20,000 per year depending on category and level of education.",
        howToApply: "Register on scholarships.gov.in, fill application form, upload documents and submit before deadline.",
        documentsRequired: [
            "Aadhaar Card",
            "Income Certificate",
            "Previous Year Marksheet",
            "Bank Account Details",
            "Caste Certificate (if applicable)",
            "Enrollment Certificate"
        ],
        websiteLink: "https://scholarships.gov.in",
        isActive: true
    },
    {
        name: "Prime Minister's Scholarship Scheme (PMSS)",
        description: "Scholarship for wards and widows of ex-servicemen and ex-coast guard personnel pursuing professional degree courses like BE, MBBS, BDS, BBA, BCA, B.Pharma etc.",
        ministry: "Ministry of Home Affairs",
        eligibility: {
            minAge: 17,
            maxAge: 25,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 600000,
            businessType: ["Student"],
            sectors: ["Education"],
            educationRequired: "12th Pass"
        },
        benefits: "₹2,500 per month for boys and ₹3,000 per month for girls for entire duration of the course.",
        howToApply: "Apply through Kendriya Sainik Board portal ksb.gov.in. Verification done through respective Record Offices.",
        documentsRequired: [
            "Aadhaar Card",
            "Ex-serviceman PPO/Discharge Book",
            "12th Marksheet",
            "Admission Letter",
            "Bank Account Details",
            "Passport Size Photo"
        ],
        websiteLink: "https://ksb.gov.in",
        isActive: true
    },
    {
        name: "Vidya Lakshmi Education Loan",
        description: "Single window platform for students to apply for education loans from multiple banks simultaneously. Covers tuition fees, hostel charges, books, equipment and other education-related expenses.",
        ministry: "Ministry of Finance",
        eligibility: {
            minAge: 16,
            maxAge: 35,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 500000,
            businessType: ["Student"],
            sectors: ["Education"],
            educationRequired: "12th Pass"
        },
        benefits: "Loans up to ₹6.5 Lakh without collateral. Above ₹6.5 Lakh with collateral at subsidized interest rates starting 8.5% per annum.",
        howToApply: "Register on vidyalakshmi.co.in, fill Common Education Loan Application Form (CELAF) and apply to multiple banks.",
        documentsRequired: [
            "Aadhaar Card",
            "PAN Card",
            "Admission Letter",
            "Fee Structure",
            "10th & 12th Marksheets",
            "Income Proof of Parents",
            "Bank Statements"
        ],
        websiteLink: "https://www.vidyalakshmi.co.in",
        isActive: true
    },
    {
        name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
        description: "Flagship skill development scheme for Indian youth to learn industry-relevant skills. Offers free short-term training programs across 200+ job roles in various sectors through registered training partners.",
        ministry: "Ministry of Skill Development and Entrepreneurship",
        eligibility: {
            minAge: 15,
            maxAge: 35,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 300000,
            businessType: ["Student", "Unemployed Youth"],
            sectors: ["Manufacturing", "Services", "Technology", "Healthcare", "Agriculture"],
            educationRequired: "None"
        },
        benefits: "Free skill training and certification. Average monetary reward of ₹8,000 on successful certification. Job placement assistance provided.",
        howToApply: "Find nearest training center on pmkvyofficial.org or call toll-free 08800055555. Enroll at training center with documents.",
        documentsRequired: [
            "Aadhaar Card",
            "Bank Account Details",
            "Passport Size Photo",
            "Educational Certificates (if any)"
        ],
        websiteLink: "https://pmkvyofficial.org",
        isActive: true
    },
    {
        name: "National Apprenticeship Training Scheme (NATS)",
        description: "Government apprenticeship program for diploma and degree pass-outs to get practical training in industries. Learn while you earn program connecting students with top companies across India.",
        ministry: "Ministry of Education",
        eligibility: {
            minAge: 16,
            maxAge: 35,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 500000,
            businessType: ["Student", "Fresh Graduate"],
            sectors: ["Technology", "Manufacturing", "Services", "Healthcare"],
            educationRequired: "Diploma or Degree"
        },
        benefits: "Monthly stipend of ₹1,700 to ₹3,500. Practical industry experience certificate recognized by Government of India. Better job prospects.",
        howToApply: "Register on nats.education.gov.in as apprentice. Search and apply to establishments. Get selected and start training.",
        documentsRequired: [
            "Aadhaar Card",
            "Degree/Diploma Certificate",
            "Marksheets",
            "Bank Account Details",
            "Passport Size Photo"
        ],
        websiteLink: "https://nats.education.gov.in",
        isActive: true
    },
    {
        name: "Student Startup & Innovation Policy (SSIP)",
        description: "Government initiative to support student entrepreneurs with funding, mentorship and incubation support. Designed for students with innovative business ideas who want to build startups while studying.",
        ministry: "Ministry of Education",
        eligibility: {
            minAge: 18,
            maxAge: 30,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["All India"],
            maxIncome: 1000000,
            businessType: ["Student", "Startup"],
            sectors: ["Technology", "Healthcare", "Agriculture", "Education", "Manufacturing"],
            educationRequired: "Currently Enrolled in College"
        },
        benefits: "Seed funding up to ₹2 Lakh for proof of concept. Up to ₹10 Lakh for prototype development. Free mentorship and incubation support.",
        howToApply: "Apply through your college's incubation center or innovation cell. Pitch your idea and get selected for funding.",
        documentsRequired: [
            "College Enrollment Certificate",
            "Aadhaar Card",
            "Business Plan / Pitch Deck",
            "Bank Account Details",
            "Prototype / Demo (if available)"
        ],
        websiteLink: "https://innovation.gov.in",
        isActive: true
    },
    {
        name: "Ishan Uday Scholarship for North East",
        description: "Special scholarship scheme for students from North Eastern states pursuing general degree courses. Aims to encourage higher education among students from the North East region of India.",
        ministry: "University Grants Commission (UGC)",
        eligibility: {
            minAge: 17,
            maxAge: 30,
            gender: ["Male", "Female", "Other"],
            category: ["General", "SC", "ST", "OBC"],
            states: ["Assam", "Meghalaya", "Manipur", "Mizoram", "Nagaland", "Tripura", "Arunachal Pradesh", "Sikkim"],
            maxIncome: 450000,
            businessType: ["Student"],
            sectors: ["Education"],
            educationRequired: "12th Pass"
        },
        benefits: "₹5,400 per month for general degree courses. ₹7,800 per month for technical and professional courses.",
        howToApply: "Apply through National Scholarship Portal scholarships.gov.in during the application window.",
        documentsRequired: [
            "Aadhaar Card",
            "Domicile Certificate of North East State",
            "12th Marksheet",
            "Income Certificate",
            "Admission Letter",
            "Bank Account Details"
        ],
        websiteLink: "https://scholarships.gov.in",
        isActive: true
    },
    {
        name: "Post Matric Scholarship for SC Students",
        description: "Scholarship for Scheduled Caste students studying at post-matriculation or post-secondary stage to enable them to complete their education. One of the largest scholarship schemes in India.",
        ministry: "Ministry of Social Justice and Empowerment",
        eligibility: {
            minAge: 15,
            maxAge: 30,
            gender: ["Male", "Female", "Other"],
            category: ["SC"],
            states: ["All India"],
            maxIncome: 250000,
            businessType: ["Student"],
            sectors: ["Education"],
            educationRequired: "10th Pass"
        },
        benefits: "Maintenance allowance from ₹570 to ₹1,200 per month. Full tuition fee reimbursement. Study tour and thesis charges covered.",
        howToApply: "Apply through National Scholarship Portal or state scholarship portal before the deadline. Get verified by institution.",
        documentsRequired: [
            "Aadhaar Card",
            "Caste Certificate",
            "Income Certificate",
            "Previous Marksheet",
            "Admission Receipt",
            "Bank Account Details"
        ],
        websiteLink: "https://scholarships.gov.in",
        isActive: true
    }
];

export default studentSchemes;