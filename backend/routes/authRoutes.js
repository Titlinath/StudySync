const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const {
  signupValidation,
  loginValidation,
  validate,
} = require('../middleware/validation');

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post('/signup', signupValidation, validate, signup);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginValidation, validate, login);

module.exports = router;