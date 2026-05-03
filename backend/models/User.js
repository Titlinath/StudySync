const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxLength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: {
        values: ['student', 'teacher', 'worker', 'admin'],
        message: 'Role must be either student, teacher, worker, or admin',
      },
      required: [true, 'Please specify a role'],
      default: 'student',
    },
    institution: {
      type: String,
      trim: true,
      required: function () {
        return this.role === 'student' || this.role === 'teacher';
      },
      validate: {
        validator: function (value) {
          if (this.role === 'student' || this.role === 'teacher') {
            return value && value.trim().length > 0;
          }
          return true;
        },
        message: 'Institution is required for students and teachers',
      },
    },
    company: {
      type: String,
      trim: true,
      required: function () {
        return this.role === 'worker';
      },
      validate: {
        validator: function (value) {
          if (this.role === 'worker') {
            return value && value.trim().length > 0;
          }
          return true;
        },
        message: 'Company is required for workers',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

module.exports = mongoose.model('User', userSchema);