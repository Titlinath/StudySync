const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const StudySession = require('../models/StudySession');

// All routes require authentication
router.use(protect);

// @route   POST /api/study-sessions
// @desc    Create a new study session
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { subject, duration, type, note, date } = req.body;

    const session = await StudySession.create({
      userId: req.user.id,
      subject,
      duration,
      type: type || 'focus',
      note,
      date: date || new Date(),
      completedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Study session created',
      data: { session }
    });
  } catch (error) {
    console.error('Create Session Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating study session',
      error: error.message
    });
  }
});

// @route   GET /api/study-sessions
// @desc    Get all study sessions for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { subject, startDate, endDate } = req.query;
    
    const query = { userId: req.user.id };
    
    if (subject) query.subject = subject;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const sessions = await StudySession.find(query).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: { sessions }
    });
  } catch (error) {
    console.error('Get Sessions Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching study sessions',
      error: error.message
    });
  }
});

// @route   DELETE /api/study-sessions/:id
// @desc    Delete a study session
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const session = await StudySession.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Study session not found'
      });
    }

    await session.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Study session deleted',
      data: {}
    });
  } catch (error) {
    console.error('Delete Session Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting study session',
      error: error.message
    });
  }
});

module.exports = router;