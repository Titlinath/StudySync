const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  completedAt: Date
});

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  targetDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  milestones: [milestoneSchema],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date
}, {
  timestamps: true
});

// Calculate progress before saving
goalSchema.pre('save', function(next) {
  if (this.milestones && this.milestones.length > 0) {
    const completed = this.milestones.filter(m => m.isDone).length;
    this.progress = Math.round((completed / this.milestones.length) * 100);
    this.isCompleted = this.progress === 100;
    
    if (this.isCompleted && !this.completedAt) {
      this.completedAt = new Date();
    }
  }
  next();
});

goalSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Goal', goalSchema);