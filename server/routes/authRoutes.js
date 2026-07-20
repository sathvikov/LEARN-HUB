const express = require('express');
const { register, login, getProfile, enrollCourse, markCourseComplete } = require('../controllers/authController');
const { authenticateToken, requireStudent } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

// Student actions
router.post('/enroll', authenticateToken, requireStudent, enrollCourse);
router.post('/complete', authenticateToken, requireStudent, markCourseComplete);

module.exports = router;

