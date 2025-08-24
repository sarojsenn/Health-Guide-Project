# Complete Project Workflow - Healthcare Management System

## 📋 Project Overview

This project consists of two integrated healthcare applications:

1. **MediMate (Ignithon)** - AI-powered health and nutrition assistant with authentication
2. **Water Quality Monitoring System** - Environmental health monitoring with AI analysis

Both applications use Google Gemini AI for intelligent analysis and recommendations.

## 🏗️ Project Architecture

### Overall Structure
```
fresh start/
├── Ignithonfrontend/
│   └── Ignithon/
│       ├── client/                 # Frontend (HTML/CSS/JS)
│       │   ├── auth.html          # Authentication page
│       │   ├── main.html          # Main dashboard
│       │   ├── main2.html         # Secondary page
│       │   └── script.js          # Frontend logic
│       └── server/                # Backend (Node.js/Express)
│           ├── index.js           # Main server file
│           ├── package.json       # Dependencies
│           ├── middleware/
│           │   └── auth.js        # JWT authentication
│           ├── models/
│           │   └── User.js        # MongoDB user schema
│           ├── routes/
│           │   ├── auth.js        # Authentication routes
│           │   └── chatbot.js     # AI chatbot routes
│           └── utils/
│               └── sendOTPEmail.js # Email service
└── Water And Sanitation/
    ├── backend/
    │   ├── server.js              # Express server
    │   ├── package.json           # Dependencies
    │   ├── test_api.js            # API tests
    │   ├── test_gemini.js         # AI tests
    │   └── uploads/               # File storage
    └── frontend/
        ├── index.html             # Water quality UI
        ├── script.js              # Frontend logic
        └── style.css              # Styling
```

## 🚀 Development Workflow

### 1. Environment Setup

#### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or cloud)
- Google Gemini API key
- Email service credentials (for OTP)
- Git for version control

#### Initial Setup
1. **Clone/Download the project**
2. **Set up MediMate backend:**
   ```bash
   cd "fresh start/Ignithonfrontend/Ignithon/server"
   npm install
   ```
3. **Create .env file for MediMate:**
   ```env
   MONGO_URI=mongodb://localhost:27017/medimate
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Set up Water Quality backend:**
   ```bash
   cd "../../../Water And Sanitation/backend"
   npm install
   ```
5. **Create .env file for Water Quality:**
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

6. **Create uploads directory:**
   ```bash
   mkdir uploads
   ```

### 2. Running the Applications

#### MediMate Application
1. **Start the backend server:**
   ```bash
   cd "fresh start/Ignithonfrontend/Ignithon/server"
   node index.js
   ```
   - Server runs on `http://localhost:5000`

2. **Access the frontend:**
   - Open `client/auth.html` in browser for authentication
   - Open `client/main.html` for the main dashboard

#### Water Quality Application
1. **Start the backend server:**
   ```bash
   cd "Water And Sanitation/backend"
   node server.js
   ```
   - Server runs on `http://localhost:3000`

2. **Access the frontend:**
   - Open `frontend/index.html` in browser

### 3. Application Features & User Flows

#### MediMate Application Flow

##### Authentication System
1. **User Registration:**
   - User enters email and password
   - System generates and sends OTP via email
   - User verifies OTP to complete registration
   - JWT token issued for session management

2. **User Login:**
   - User enters credentials
   - System sends OTP for verification
   - User verifies OTP
   - JWT token issued for authenticated access

##### Main Dashboard Features
1. **Health Journey Tracking:**
   - Personal health profile management
   - Health goals setting and tracking
   - Progress visualization with charts
   - Medical history PDF generation

2. **AI-Powered Health Assessment:**
   - Interactive health surveys
   - Personalized health scoring
   - Real-time health recommendations
   - Lifestyle guidance suggestions

3. **Nutrition Management:**
   - AI-generated meal plans
   - Calorie and nutrient tracking
   - Food alternative suggestions
   - Dietary preference accommodation

4. **Medical Support:**
   - Symptom checker with AI analysis
   - First aid recommendations
   - Medicine suggestions
   - Emergency disclaimers

5. **Rural Healthcare Support:**
   - Nearby healthcare facility finder
   - Local food alternatives
   - Affordable nutrition options
   - Community health resources

6. **AI Chatbot Integration:**
   - Real-time health consultations
   - Conversation history tracking
   - Personalized health advice
   - Emergency response guidance

#### Water Quality Application Flow

1. **Issue Reporting:**
   - User describes water quality problem
   - Optional photo upload for visual analysis
   - Location information capture
   - Issue type categorization

2. **AI Analysis:**
   - Text analysis using Gemini AI
   - Image classification for water quality
   - Severity assessment (urgent/medium/low)
   - Safety recommendations

3. **Health Services:**
   - First aid suggestions based on symptoms
   - Nearby healthcare facility recommendations
   - Emergency response guidance
   - Medicine availability information

4. **Location Services:**
   - GPS-based facility finding
   - Distance calculations
   - Contact information provision
   - Accessibility information

### 4. API Endpoints

#### MediMate API (Port 5000)

##### Authentication Routes (`/api/auth`)
- `POST /send-otp` - Generate and send OTP
- `POST /verify-otp` - Verify OTP for registration
- `POST /signup` - Complete user registration
- `POST /login` - User login with OTP
- `GET /profile` - Get user profile (protected)
- `GET /protected` - Example protected route

##### Chatbot Routes (`/api/chatbot`)
- `POST /chat` - Send message to AI chatbot (protected)
- `POST /chat-with-history` - Chat with conversation history

#### Water Quality API (Port 3000)

##### Core Routes
- `POST /api/report` - Submit water quality report
- `POST /api/firstaid` - Get first aid recommendations
- `POST /api/nearby-facilities` - Find nearby healthcare facilities

### 5. Database Schema

#### MediMate User Schema (MongoDB)
```javascript
{
  email: String (required, unique),
  password: String (hashed),
  otp: String (temporary),
  otpExpires: Date,
  name: String,
  other: String
}
```

### 6. Technology Stack

#### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Responsive design with dark/light themes
- **Vanilla JavaScript** - Interactive functionality
- **Tailwind CSS** - Utility-first styling
- **Font Awesome** - Icon library

#### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (MediMate)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email service
- **CORS** - Cross-origin requests

#### AI & External Services
- **Google Gemini AI** - Text and image analysis
- **Nodemailer** - OTP email delivery
- **Axios** - HTTP client for API calls

### 7. Security Features

#### Authentication & Authorization
- JWT-based session management
- OTP verification for enhanced security
- Password hashing with bcrypt
- Protected routes with middleware
- Token expiration handling

#### Data Protection
- Input validation and sanitization
- CORS configuration
- Environment variable protection
- Secure file upload handling
- API rate limiting considerations

### 8. Testing Strategy

#### Unit Testing
- Individual function testing
- Mock external API dependencies
- Validate input/output scenarios
- Error handling verification

#### Integration Testing
- API endpoint testing
- Database connectivity
- AI service integration
- File upload functionality

#### Manual Testing
- User interface testing
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility compliance

### 9. Deployment Workflow

#### Development Environment
- Local MongoDB instance
- Development API keys
- Hot reloading for development
- Debug logging enabled

#### Staging Environment
- Staged database
- Testing API quotas
- Performance monitoring
- User acceptance testing

#### Production Environment
- Production database
- SSL certificates
- CDN for static assets
- Error monitoring and logging
- Backup strategies

### 10. Monitoring & Maintenance

#### Application Monitoring
- Server uptime tracking
- API response times
- Error rate monitoring
- User activity analytics

#### Security Monitoring
- Failed authentication attempts
- Suspicious activity detection
- API usage monitoring
- Regular security audits

#### Performance Optimization
- Database query optimization
- Image compression
- Caching strategies
- Load balancing considerations

### 11. Future Enhancements

#### Planned Features
- **Mobile Application** - Native iOS/Android apps
- **Advanced Analytics** - Health trend analysis
- **Telemedicine Integration** - Video consultations
- **Wearable Device Integration** - Fitness tracker sync
- **Multi-language Support** - Localization
- **Community Features** - Health forums and groups

#### Technical Improvements
- **Microservices Architecture** - Service separation
- **Docker Containerization** - Deployment standardization
- **Redis Caching** - Performance improvement
- **GraphQL API** - Flexible data querying
- **Real-time Notifications** - WebSocket implementation
- **Advanced AI Models** - Specialized health models

### 12. Troubleshooting Guide

#### Common Issues

1. **MongoDB Connection Error**
   - Check MongoDB service status
   - Verify connection string
   - Ensure database permissions

2. **Gemini API Errors**
   - Verify API key validity
   - Check API quota limits
   - Monitor rate limiting

3. **Email Service Issues**
   - Verify SMTP credentials
   - Check spam folder
   - Test email connectivity

4. **File Upload Problems**
   - Check uploads directory permissions
   - Verify file size limits
   - Validate file types

5. **CORS Issues**
   - Configure proper origins
   - Check preflight requests
   - Verify headers

#### Debug Tools
- Browser Developer Console
- Node.js debugger
- MongoDB Compass
- Postman for API testing
- Network tab analysis

### 13. Contributing Guidelines

#### Code Standards
- Use consistent naming conventions
- Write descriptive commit messages
- Add comments for complex logic
- Follow error handling patterns
- Maintain code documentation

#### Pull Request Process
1. Create feature branch
2. Implement changes with tests
3. Update documentation
4. Submit pull request
5. Code review and approval
6. Merge to main branch

### 14. Support & Resources

#### Documentation
- API documentation
- User guides
- Technical specifications
- Deployment guides

#### Contact Information
- Development team contacts
- Issue reporting process
- Feature request procedure
- Emergency support contacts

---

## 🎯 Quick Start Commands

### Start MediMate Application
```bash
# Backend
cd "fresh start/Ignithonfrontend/Ignithon/server"
npm install
node index.js

# Frontend - Open in browser
# auth.html for authentication
# main.html for dashboard
```

### Start Water Quality Application
```bash
# Backend
cd "Water And Sanitation/backend"
npm install
node server.js

# Frontend - Open in browser
# frontend/index.html
```

### Environment Variables Setup
```bash
# MediMate .env
MONGO_URI=mongodb://localhost:27017/medimate
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_key
EMAIL_USER=your_email
EMAIL_PASS=your_password

# Water Quality .env
GEMINI_API_KEY=your_gemini_key
```

---

*This workflow document should be updated as the project evolves and new features are added.*
