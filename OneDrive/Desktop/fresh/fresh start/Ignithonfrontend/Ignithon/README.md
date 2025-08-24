# 🏥 HealthGuide - AI-Powered Health & Wellness Platform

[![Node.js](https://img.shields.io/badge/Node.js-16.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue.svg)](https://tailwindcss.com/)

## 🌟 Overview

HealthGuide is a comprehensive AI-powered health and wellness platform that provides personalized health recommendations, goal tracking, nutrition analysis, and health monitoring capabilities. Built with modern web technologies, it offers a seamless experience for users to manage their health journey.

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
├── client/                     # Frontend files
│   ├── auth.html              # Authentication page
│   ├── auth.js                # Authentication logic
│   ├── main.html              # Main dashboard
│   ├── main2.html             # Secondary pages
│   └── script.js              # Core JavaScript functionality
│
├── server/                     # Backend files
│   ├── index.js               # Server entry point
│   ├── package.json           # Dependencies and scripts
│   ├── .env                   # Environment configuration
│   │
│   ├── middleware/            # Express middleware
│   │   └── auth.js           # JWT authentication middleware
│   │
│   ├── models/               # Database models
│   │   └── User.js           # User schema definition
│   │
│   ├── routes/               # API routes
│   │   ├── auth.js           # Authentication endpoints
│   │   └── chatbot.js        # AI chatbot endpoints
│   │
│   └── utils/                # Utility functions
│       └── sendOTPEmail.js   # Email service utilities
│
└── README.md                 # Project documentation
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

### 2. Install Dependencies
```bash
cd server
npm install
```

### 3. Environment Configuration
Create a `.env` file in the server directory:

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

### 4. Start the Server
```bash
cd server
npm start
# or for development
npm run dev
```

### 5. Access the Application
- **Frontend**: Open `client/main.html` in your browser
- **Authentication**: Start with `client/auth.html`
- **Server**: Runs on `http://localhost:5000`

## 📖 API Documentation

### Authentication Endpoints

#### POST `/api/auth/send-otp`
Send OTP for login/signup verification
```json
{
  "email": "user@example.com",
  "password": "userpassword",
  "signup": true
}
```

#### POST `/api/auth/verify-otp`
Verify OTP code
```json
{
  "email": "user@example.com",
  "password": "userpassword",
  "otp": "123456"
}
```

#### POST `/api/auth/signup`
Complete user registration
```json
{
  "email": "user@example.com",
  "password": "userpassword",
  "name": "John Doe",
  "age": 25,
  "gender": "Male",
  "contact": "1234567890"
}
```

#### POST `/api/auth/login`
User login with OTP
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

#### GET `/api/auth/profile`
Get user profile (requires JWT token)
```http
Authorization: Bearer <jwt_token>
```

### Chatbot Endpoints

#### POST `/api/chatbot/chat-with-history`
AI conversation with context
```json
{
  "message": "How can I improve my sleep quality?",
  "sessionId": "session_unique_id"
}
```

## 🎨 Features Showcase

### 🔐 **Authentication Flow**
1. **Email Entry** → **OTP Generation** → **Email Verification** → **Profile Setup** → **Dashboard Access**
2. **Secure JWT Tokens** for session management
3. **Password Recovery** and **Account Security**

### 🎯 **Goals Management**
- **8 Goal Categories**: Water, Exercise, Sleep, Meditation, Nutrition, Weight, Steps, Custom
- **Progress Tracking**: Visual progress bars with completion percentages
- **Achievement System**: Celebrations and trophies for completed goals
- **Flexible Scheduling**: Daily, Weekly, Monthly goal frequencies

### 🤖 **AI Health Assistant**
- **Contextual Conversations** with memory across sessions
- **Health Analysis** based on user input and symptoms
- **Personalized Recommendations** for wellness improvement
- **Emergency Guidance** for critical health situations

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

## 🚀 Deployment

### Local Development
```bash
# Start the server
cd server && npm start

# Open the frontend
# Navigate to client/main.html in your browser
```

### Production Deployment
1. **Backend**: Deploy to platforms like Heroku, Vercel, or AWS
2. **Frontend**: Host on GitHub Pages, Netlify, or Vercel
3. **Database**: Use MongoDB Atlas for production
4. **Environment**: Set production environment variables

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Saroj Sen**
- GitHub: [@sarojsenn](https://github.com/sarojsenn)
- Email: sarojsen2009@gmail.com

## 🙏 Acknowledgments

- **Google Gemini API** for AI capabilities
- **MongoDB Atlas** for database services
- **Tailwind CSS** for beautiful styling
- **Font Awesome** for icons
- **Node.js Community** for excellent packages

## 📞 Support

For support, email sarojsen2009@gmail.com or create an issue in the GitHub repository.

---

⭐ **Star this repository if you found it helpful!**

**Built with ❤️ for better health and wellness**
