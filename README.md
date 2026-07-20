# 🧠 LearnHub - Full Stack Educational Platform

A comprehensive educational platform built with React, Node.js, and MongoDB. LearnHub provides free courses with certificate generation capabilities for students and course management for administrators.

## 🚀 Features

### For Students
- Browse and enroll in free courses
- Watch course videos with progress tracking
- Generate completion certificates (PDF)
- Track learning progress
- Responsive design for all devices

### For Administrators
- Create, edit, and delete courses
- Manage course content and videos
- Upload course thumbnails
- Monitor course statistics

## 🛠️ Tech Stack

### Frontend
- **React** with Vite
- **Tailwind CSS** for styling
- **jsPDF** for certificate generation

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing

## 📁 Project Structure

```
LearnHub/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LearnHub
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/learnhub
   JWT_SECRET=learnhub_super_secret_jwt_key_2024
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your local machine:
   ```bash
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

7. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🎨 UI/UX Features

- **Modern Design:** Clean, minimal interface with Tailwind CSS
- **Responsive:** Works perfectly on desktop, tablet, and mobile
- **Accessibility:** Proper contrast ratios and keyboard navigation
- **Animations:** Smooth transitions and hover effects
- **Dark Mode Ready:** Easy to implement dark theme

## 🔧 Development

### Backend Development
```bash
cd server
npm run dev  # Starts with nodemon for auto-restart
```

### Frontend Development
```bash
cd client
npm run dev  # Starts Vite development server
```

### Building for Production
```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start
```

## 📝 Key Features Implementation

### Authentication System
- JWT-based authentication
- Role-based access control (Admin/Student)
- Password hashing with bcrypt

### Course Management
- CRUD operations for courses
- Video URL management
- Category-based organization
- Thumbnail support

### Certificate Generation
- PDF generation with jsPDF
- Custom certificate design
- Student and course information
- Download functionality

### Database Models
- **User:** Authentication and enrollment tracking
- **Course:** Course content and metadata
- **Certificate:** Completion certificates

## 🚀 Deployment

### Frontend (Vercel)
1. Build the frontend: `npm run build`
2. Deployed the client folder to your hosting service
3. Update API base URL in production

### Backend (Render)
1. Set environment variables
2. Deployed the server directory
3. Configured MongoDB Atlas for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- Video upload functionality
- Progress tracking with timestamps
- Course ratings and reviews
- Email notifications
- Advanced analytics dashboard
- Mobile app development

---

**LearnHub** - Learn. Grow. Achieve. 🚀



