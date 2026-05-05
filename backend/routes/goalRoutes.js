const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Goal = require('../models/Goal');

// All routes require authentication
router.use(protect);

// @route   POST /api/goals
// @desc    Create a new goal
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { title, description, subject, targetDate, priority, milestones } = req.body;

    const goal = await Goal.create({
      userId: req.user.id,
      title,
      description,
      subject,
      targetDate,
      priority: priority || 'medium',
      milestones: milestones || []
    });

    res.status(201).json({
      success: true,
      message: 'Goal created successfully',
      data: { goal }
    });
  } catch (error) {
    console.error('Create Goal Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating goal',
      error: error.message
    });
  }
});

// @route   GET /api/goals
// @desc    Get all goals for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: goals.length,
      data: { goals }
    });
  } catch (error) {
    console.error('Get Goals Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching goals',
      error: error.message
    });
  }
});

// @route   GET /api/goals/:id
// @desc    Get single goal
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { goal }
    });
  } catch (error) {
    console.error('Get Goal Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching goal',
      error: error.message
    });
  }
});

// @route   PUT /api/goals/:id
// @desc    Update goal
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    const { title, description, subject, targetDate, priority, milestones } = req.body;

    if (title) goal.title = title;
    if (description !== undefined) goal.description = description;
    if (subject) goal.subject = subject;
    if (targetDate) goal.targetDate = targetDate;
    if (priority) goal.priority = priority;
    if (milestones) goal.milestones = milestones;

    await goal.save();

    res.status(200).json({
      success: true,
      message: 'Goal updated successfully',
      data: { goal }
    });
  } catch (error) {
    console.error('Update Goal Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating goal',
      error: error.message
    });
  }
});

// @route   DELETE /api/goals/:id
// @desc    Delete goal
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    await goal.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Goal deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Delete Goal Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting goal',
      error: error.message
    });
  }
});

// @route   PATCH /api/goals/:goalId/milestones/:milestoneId/toggle
// @desc    Toggle milestone completion
// @access  Private
router.patch('/:goalId/milestones/:milestoneId/toggle', async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.goalId,
      userId: req.user.id
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    const milestone = goal.milestones.id(req.params.milestoneId);
    
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Milestone not found'
      });
    }

    milestone.isDone = !milestone.isDone;
    milestone.completedAt = milestone.isDone ? new Date() : null;

    await goal.save();

    res.status(200).json({
      success: true,
      message: 'Milestone updated',
      data: { goal }
    });
  } catch (error) {
    console.error('Toggle Milestone Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating milestone',
      error: error.message
    });
  }
});

module.exports = router;