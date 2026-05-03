const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  deleteUser,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// Apply protection and admin authorization to all routes
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', getAllUsers);

// @route   GET /api/admin/users/:id
// @desc    Get user by ID
// @access  Private/Admin
router.get('/users/:id', getUserById);

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', deleteUser);

module.exports = router;