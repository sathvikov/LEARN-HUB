const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB().then(() => {
  const seedAdmin = async () => {
    try {
      const User = require('./models/User');
      const bcrypt = require('bcrypt');
      const email = 'admin@learnhub.com';
      const password = 'admin123';

      const existing = await User.findOne({ email });
      if (existing) {
        console.log('✅ Admin user exists in database.');
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const admin = new User({
        name: 'Admin',
        email,
        password: hashed,
        role: 'admin'
      });

      await admin.save();
      console.log('✅ Auto-seeded admin user: admin@learnhub.com');
    } catch (err) {
      console.error('❌ Auto-seeding admin failed:', err.message);
    }
  };
  seedAdmin();
});


const app = express();

// ============================
// ✅ CORS Configuration (Render + Localhost Safe)
// ============================
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://sathvikov.github.io',
  process.env.FRONTEND_URL, 
];


app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman or server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`❌ Blocked CORS request from origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Explicitly handle OPTIONS preflight for all routes
app.options('*', cors());

// ============================
// ✅ Middleware
// ============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// ✅ Routes
// ============================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: '✅ LearnHub API is running!' });
});

// ============================
// ✅ Error Handling Middleware
// ============================
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ============================
// ✅ 404 Handler
// ============================
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ============================
// ✅ Server Start
// ============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 LearnHub API ready at http://localhost:${PORT}`);
});
