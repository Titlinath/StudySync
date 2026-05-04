const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  pinned: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#FFFFFF'
  }
}, {
  timestamps: true
});

noteSchema.index({ userId: 1, updatedAt: -1 });
noteSchema.index({ userId: 1, subject: 1 });

module.exports = mongoose.model('Note', noteSchema);