const express = require('express');
const { generateCertificate, getUserCertificates } = require('../controllers/certificateController');
const { authenticateToken, requireStudent } = require('../middleware/authMiddleware');

const router = express.Router();

// Student only routes
router.post('/generate', authenticateToken, requireStudent, generateCertificate);
router.get('/my-certificates', authenticateToken, requireStudent, getUserCertificates);

module.exports = router;

