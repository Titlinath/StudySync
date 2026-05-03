const { body, validationResult } = require('express-validator');

// Validation middleware to check for errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Signup validation rules
exports.signupValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['student', 'teacher', 'worker', 'admin'])
    .withMessage('Invalid role specified'),

  body('institution').custom((value, { req }) => {
    if (req.body.role === 'student' || req.body.role === 'teacher') {
      if (!value || value.trim().length === 0) {
        throw new Error('Institution is required for students and teachers');
      }
    }
    return true;
  }),

  body('company').custom((value, { req }) => {
    if (req.body.role === 'worker') {
      if (!value || value.trim().length === 0) {
        throw new Error('Company is required for workers');
      }
    }
    return true;
  }),
];

// Login validation rules
exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password').notEmpty().withMessage('Password is required'),
];