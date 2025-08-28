# 🌟 HealthGuide - Complete Health & Wellness Platform

[![Node.js](https://img.shields.io/badge/Node.js-16.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue.svg)](https://tailwindcss.com/)

## 🌟 Overview

HealthGuide is a comprehensive AI-powered health and wellness platform that provides personalized health recommendations, goal tracking, nutrition analysis, water quality monitoring, and health management capabilities. Built with modern web technologies, it offers a seamless experience for users to manage their complete health journey.

## ✨ Key Features

### 🔐 **Secure Authentication System**
- **OTP-based Email Verification** - Secure signup/login with email OTP
- **JWT Token Authentication** - Secure session management
- **Profile Management** - Complete user profile with health data
- **Password Security** - Encrypted password storage with bcrypt

### 🎯 **Smart Goals Management**
- **Goal Creation** - Add custom health and wellness goals
- **Progress Tracking** - Real-time progress visualization
- **Goal Templates** - Pre-defined templates (Water intake, Exercise, Sleep, etc.)
- **Priority System** - High, Medium, Low priority categorization
- **Achievement Celebrations** - Visual feedback for completed goals

### 🤖 **AI-Powered Health Assistant**
- **Google Gemini Integration** - Advanced AI conversations
- **Health Recommendations** - Personalized health suggestions
- **Symptom Analysis** - AI-powered health assessments
- **Session Management** - Continuous conversation context

### 💧 **Water Quality Monitoring**
- **Real-time Water Testing** - Report and track water quality issues
- **Location Detection** - Automatic location tracking for reports
- **Photo Documentation** - Visual evidence for water quality issues
- **Community Reports** - Share water quality data with community

### 📊 **Health Monitoring Dashboard**
- **Interactive UI** - Modern, responsive design with dark/light themes
- **Progress Visualizations** - Beautiful progress bars and charts
- **Health Metrics** - Track various health parameters
- **Upcoming Events** - Health appointment reminders

### 🍎 **NutriScan & Food Analysis**
- **Food Recognition** - AI-powered food identification
- **Nutritional Analysis** - Detailed macro and micronutrient breakdown
- **Calorie Tracking** - Real-time calorie monitoring
- **Dietary Recommendations** - Personalized nutrition advice

### 🚨 **Emergency & First Aid**
- **Emergency Contacts** - Quick access to emergency services
- **First Aid Guide** - Step-by-step emergency procedures
- **Location Services** - Find nearby hospitals and clinics
- **Emergency Protocols** - Critical health emergency guidance

## 🛠️ Tech Stack

### **Frontend**
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Dynamic functionality and interactions
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icon library for UI elements

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database service
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Secure authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service integration

### **AI & External Services**
- **Google Gemini API** - Advanced AI conversations
- **Gmail SMTP** - Email verification service
- **Environment Variables** - Secure configuration management

## 📁 Project Structure

```
HealthGuide/
├── Ignithon/                        # Main application directory
│   ├── client/                      # Frontend files
│   │   ├── auth.html               # Authentication page
│   │   ├── auth.js                 # Authentication logic
│   │   ├── main.html               # Main dashboard
│   │   └── script.js               # Core JavaScript functionality
│   │
│   ├── server/                     # Backend files
│   │   ├── index.js                # Server entry point
│   │   ├── package.json            # Dependencies and scripts
│   │   ├── .env                    # Environment configuration
│   │   │
│   │   ├── middleware/             # Express middleware
│   │   │   └── auth.js            # JWT authentication middleware
│   │   │
│   │   ├── models/                # Database models
│   │   │   └── User.js            # User schema definition
│   │   │
│   │   ├── routes/                # API routes
│   │   │   ├── auth.js            # Authentication endpoints
│   │   │   └── chatbot.js         # AI chatbot endpoints
│   │   │
│   │   └── utils/                 # Utility functions
│   │       └── sendOTPEmail.js    # Email service utilities
│   │
│   └── Water And Sanitation/       # Water quality monitoring
│       ├── frontend/               # Water quality frontend
│       │   ├── index.html         # Water quality reporter
│       │   ├── script.js          # Water quality logic
│       │   └── style.css          # Water quality styles
│       │
│       └── backend/               # Water quality backend
│           ├── server.js          # Water quality server
│           ├── package.json       # Dependencies
│           ├── test_api.js        # API testing
│           └── test_gemini.js     # AI integration testing
│
└── README.md                      # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB Atlas Account**
- **Gmail Account** (for email services)
- **Google Gemini API Key**

### 1. Clone the Repository
```bash
git clone https://github.com/sarojsenn/Health-Guide.git
cd Health-Guide
```

### 2. Install Main Application Dependencies
```bash
cd Ignithon/server
npm install
```

### 3. Install Water Quality Dependencies
```bash
cd ../Water\ And\ Sanitation/backend
npm install
```

### 4. Environment Configuration
Create a `.env` file in the `Ignithon/server` directory:

```env
# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/HealthGuideDB

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# AI Configuration
GEMINI_API_KEY=your_google_gemini_api_key
```

### 5. Start the Applications

#### Main HealthGuide Application
```bash
cd Ignithon/server
npm start
```

#### Water Quality Monitoring
```bash
cd "Water And Sanitation/backend"
npm start
```

### 6. Access the Application
- **Main Dashboard**: Open `Ignithon/client/main.html` in your browser
- **Authentication**: Start with `Ignithon/client/auth.html`
- **Water Quality**: Access via navigation or directly at `Water And Sanitation/frontend/index.html`
- **Servers**: 
  - Main app runs on `http://localhost:5000`
  - Water quality app runs on `http://localhost:3000`

## 🎨 Key Features & Navigation

### 🔗 **Seamless Navigation**
- **Home Navigation** - Easy return to main dashboard from any module
- **Water Quality Integration** - Direct access to water monitoring from main app
- **Cross-platform Links** - Smooth transitions between different app modules

### 🎯 **Enhanced User Experience**
- **Unified Design Language** - Consistent styling across all modules
- **Responsive Layout** - Mobile-friendly design
- **Dark/Light Theme** - User preference-based theming
- **Real-time Updates** - Live data synchronization

## 📖 API Documentation

### Authentication Endpoints (Port 5000)

#### POST `/api/auth/send-otp`
Send OTP for login/signup verification

#### POST `/api/auth/verify-otp`
Verify OTP code

#### POST `/api/auth/signup`
Complete user registration

#### GET `/api/auth/profile`
Get user profile (requires JWT token)

### Water Quality Endpoints (Port 3000)

#### POST `/api/water/report`
Submit water quality report

#### GET `/api/water/reports`
Get water quality reports by location

## 🚀 Recent Updates

### ✅ **Navigation Fixes (Latest)**
- **Fixed Water Quality Navigation** - Correct path from main dashboard to water quality module
- **Enhanced Home Navigation** - Proper return navigation from water quality to main dashboard
- **Improved Link Structure** - Consistent relative path handling across modules

### ✅ **Enhanced Features**
- **Complete Goals Management** - Full CRUD operations for health goals
- **AI Health Assistant** - Google Gemini-powered conversations
- **Water Quality Integration** - Seamless integration between health and water monitoring
- **Production-Ready Code** - Comment-free, optimized codebase

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Encryption** - bcrypt hashing for password security
- **Email Verification** - OTP-based account verification
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Server-side data validation
- **Environment Security** - Sensitive data in environment variables

## 🌐 Browser Compatibility

- ✅ **Chrome** (Recommended)
- ✅ **Firefox**
- ✅ **Safari**
- ✅ **Edge**
- ✅ **Mobile Browsers**

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## � Development Team

### **Team TASK - K-1000 Ignithon Hackathon Winners**

**Team Members:**
- **Saroj Sen** (Team Lead)
  - GitHub: [@sarojsenn](https://github.com/sarojsenn)
  - Email: sarojsen4952@gmail.com
  - Role: Full-Stack Development& Database Management 

- **Anudip Saha**
  - Role: Backend Development & AI Integration
  - GitHub: [@Aneebon](https://github.com/Aneebon)
  - Email:anudipsaha44@gmail.com

- **Kaustav Dhar**
  - Role: Frontend Development & UI/UX Design
  - GitHub: [@Kaustav-Dhar-17](https://github.com/Kaustav-Dhar-17)
  - Email: kaustavdhar5604@gmail.com
- **Tiyasa Saha**
  - Role: Frontend Development & UI/UX Design
  - GitHub: [@tiyasa-2005](https://github.com/tiyasa-2005)
  - Email: saha.tiyasa2005@gmail.com
**Event:** K-1000 Ignithon Hackathon 2025
**Group:** TASK
**Achievement:** Complete Health & Wellness Platform Suite

## 🙏 Acknowledgments

- **Google Gemini API** for AI capabilities
- **MongoDB Atlas** for database services
- **Tailwind CSS** for beautiful styling
- **Font Awesome** for icons
- **Node.js Community** for excellent packages

## 📞 Support

For support, email sarojsen4952@gmail.com or create an issue in the GitHub repository.

---

⭐ **Star this repository if you found it helpful!**

**Built with ❤️ for better health, wellness, and environmental monitoring**
