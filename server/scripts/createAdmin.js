const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();

async function createAdmin() {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || 'admin@learnhub.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const name = process.env.ADMIN_NAME || 'Admin';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin user already exists:', email);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const admin = new User({
      name,
      email,
      password: hashed,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created:', email);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

createAdmin();
