const Certificate = require('../models/Certificate');
const Course = require('../models/Course');
const User = require('../models/User');

// Generate certificate
const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user._id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if student is enrolled and completed the course
    const user = await User.findById(studentId);
    const enrollment = user.enrolledCourses.find(
      enrollment => enrollment.courseId.toString() === courseId && enrollment.completed
    );

    if (!enrollment) {
      return res.status(400).json({ message: 'Course not completed or not enrolled' });
    }

    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({
      studentId,
      courseId
    });

    if (existingCertificate) {
      return res.json({
        message: 'Certificate already generated',
        certificate: existingCertificate
      });
    }

    // Generate unique certificate ID
    const certificateId = `LH${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    // Create certificate
    const certificate = new Certificate({
      studentId,
      courseId,
      certificateId,
      studentName: user.name,
      courseTitle: course.title
    });

    await certificate.save();

    res.status(201).json({
      message: 'Certificate generated successfully',
      certificate
    });
  } catch (error) {
    console.error('Generate certificate error:', error);
    res.status(500).json({ message: 'Server error generating certificate' });
  }
};

// Get user certificates
const getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ studentId: req.user._id })
      .populate('courseId', 'title category')
      .sort({ issuedAt: -1 });

    res.json({ certificates });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({ message: 'Server error fetching certificates' });
  }
};

module.exports = {
  generateCertificate,
  getUserCertificates
};

