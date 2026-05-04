const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: 0
  },
  type: {
    type: String,
    enum: ['focus', 'shortBreak', 'longBreak'],
    default: 'focus'
  },
  note: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
studySessionSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('StudySession', studySessionSchema);