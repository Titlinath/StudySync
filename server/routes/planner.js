import express from 'express';
import StudyPlan from '../models/StudyPlan.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create Study Plan
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { subjects, availableTime, planData } = req.body;

    const studyPlan = new StudyPlan({
      userId: req.user.userId,
      subjects,
      availableTime,
      planData
    });

    await studyPlan.save();
    res.status(201).json(studyPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User's Study Plan
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const plans = await StudyPlan.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Study Plan
router.put('/update/:id', authMiddleware, async (req, res) => {
  try {
    const plan = await StudyPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Study Plan
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const plan = await StudyPlan.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;