const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Course = require('../models/Course');

// Helper to generate JWT
const generateToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register a new user
const register = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Name, email and password are required' });
		}

		const existing = await User.findOne({ email });
		if (existing) return res.status(409).json({ message: 'Email already registered' });

		const user = new User({ name, email, password, role: role || 'student' });
		await user.save();

		const token = generateToken(user._id);

		const userSafe = user.toObject();
		delete userSafe.password;

		res.status(201).json({ token, user: userSafe });
	} catch (error) {
		console.error('Register error:', error);
		res.status(500).json({ message: 'Server error registering user' });
	}
};

// Login
const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ message: 'Invalid credentials' });

		const valid = await user.comparePassword(password);
		if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

		const token = generateToken(user._id);
		const userSafe = user.toObject();
		delete userSafe.password;

		res.json({ token, user: userSafe });
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Server error logging in' });
	}
};

// Get profile (protected) - expects authenticateToken middleware to attach req.user
const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id)
			.select('-password')
			.populate('enrolledCourses.courseId', 'title duration thumbnail');

		if (!user) return res.status(404).json({ message: 'User not found' });

		res.json({ user });
	} catch (error) {
		console.error('Get profile error:', error);
		res.status(500).json({ message: 'Server error fetching profile' });
	}
};

// Enroll in a course
const enrollCourse = async (req, res) => {
	try {
		const { courseId } = req.body;
		if (!courseId) return res.status(400).json({ message: 'courseId required' });

		const course = await Course.findById(courseId);
		if (!course) return res.status(404).json({ message: 'Course not found' });

		const user = await User.findById(req.user._id);
		const already = user.enrolledCourses.some(ec => ec.courseId.toString() === courseId);
		if (already) return res.status(400).json({ message: 'Already enrolled' });

		user.enrolledCourses.push({ courseId });
		await user.save();

		await user.populate('enrolledCourses.courseId', 'title duration thumbnail');

		res.json({ enrolledCourses: user.enrolledCourses });
	} catch (error) {
		console.error('Enroll error:', error);
		res.status(500).json({ message: 'Server error enrolling in course' });
	}
};

// Mark a course as completed for the user
const markCourseComplete = async (req, res) => {
	try {
		const { courseId } = req.body;
		if (!courseId) return res.status(400).json({ message: 'courseId required' });

		const user = await User.findById(req.user._id);

		// Find enrollment robustly whether courseId is populated or an ObjectId
		const enrollment = user.enrolledCourses.find(ec => {
			if (!ec || !ec.courseId) return false;
			// If populated, ec.courseId may be an object with _id
			const cid = (ec.courseId && ec.courseId._id) ? String(ec.courseId._id) : String(ec.courseId);
			return cid === String(courseId);
		});

		if (!enrollment) return res.status(400).json({ message: 'Not enrolled in this course' });

		if (enrollment.completed) {
			// Populate and return current state
			await user.populate('enrolledCourses.courseId', 'title duration thumbnail');
			return res.json({ message: 'Already completed', enrolledCourses: user.enrolledCourses });
		}

		enrollment.completed = true;
		await user.save();

		// Populate before returning so client has course details
		await user.populate('enrolledCourses.courseId', 'title duration thumbnail');

		res.json({ message: 'Course marked complete', enrolledCourses: user.enrolledCourses });
	} catch (error) {
		console.error('Mark complete error:', error);
		res.status(500).json({ message: 'Server error marking complete' });
	}
};

module.exports = {
	register,
	login,
	getProfile,
	enrollCourse,
	markCourseComplete
};

