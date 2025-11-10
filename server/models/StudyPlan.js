import mongoose from 'mongoose';

const StudyPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subjects: [{
    name: String,
    chapters: String,
    difficulty: Number,
    targetDate: Date,
    hoursNeeded: Number
  }],
  availableTime: {
    type: Number,
    default: 4
  },
  planData: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('StudyPlan', StudyPlanSchema);