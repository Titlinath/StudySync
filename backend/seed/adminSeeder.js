const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    console.log('🌱 Starting admin seeding process...');

    // Connect to database
    await connectDB();

    // Check if admin already exists
    const adminEmail = process.env.ADMIN_EMAIL;
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('⚠️  Admin already exists in database');
      console.log(`📧 Email: ${existingAdmin.email}`);
      console.log(`👤 Name: ${existingAdmin.name}`);
      console.log('✅ No action needed. Exiting...');
      process.exit(0);
    }

    // Create admin user
    const adminData = {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD, // Will be hashed by pre-save hook
      role: 'admin',
    };

    const admin = await User.create(adminData);

    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 Email: ${admin.email}`);
    console.log(`👤 Name: ${admin.name}`);
    console.log(`🔑 Role: ${admin.role}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚠️  IMPORTANT: Keep admin credentials secure!');
    console.log('🔒 Password has been hashed and stored securely');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
};

// Run the seeder
seedAdmin();