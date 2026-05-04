const StudySession = require('../models/StudySession');
const Goal = require('../models/Goal');
const Note = require('../models/Note');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get today's study sessions
    const todaySessions = await StudySession.find({
      userId,
      date: { $gte: today }
    });

    // Calculate today's total study time
    const todayStudyTime = todaySessions
      .filter(s => s.type === 'focus')
      .reduce((total, session) => total + session.duration, 0);

    // Get active goals
    const activeGoals = await Goal.countDocuments({
      userId,
      isCompleted: false
    });

    // Get streak data
    const streakData = await calculateStreak(userId);

    // Get unique subjects studied
    const subjects = await StudySession.distinct('subject', { userId });

    // Get overall progress (average of all goals)
    const goals = await Goal.find({ userId });
    const avgProgress = goals.length > 0
      ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        activeGoals: activeGoals || 0,
        streak: streakData.current || 0,
        subjects: subjects.length || 0,
        progress: avgProgress || 0,
        todayStudyTime: todayStudyTime || 0,
        todayStudyHours: Math.floor(todayStudyTime / 60) || 0,
        todayStudyMinutes: todayStudyTime % 60 || 0,
        todayProgress: todayStudyTime > 0 ? Math.min(Math.round((todayStudyTime / 240) * 100), 100) : 0 // Target: 4 hours
      }
    });
  } catch (error) {
    console.error('Get Dashboard Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};

// @desc    Get analytics heatmap data
// @route   GET /api/dashboard/heatmap
// @access  Private
exports.getHeatmapData = async (req, res) => {
  try {
    const userId = req.user.id;
    const days = parseInt(req.query.days) || 84; // Default 12 weeks

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const sessions = await StudySession.find({
      userId,
      date: { $gte: startDate },
      type: 'focus'
    });

    // Group by date
    const heatmapData = {};
    sessions.forEach(session => {
      const dateKey = session.date.toISOString().split('T')[0];
      if (!heatmapData[dateKey]) {
        heatmapData[dateKey] = 0;
      }
      heatmapData[dateKey] += session.duration;
    });

    // Fill in missing dates with 0
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      result.push({
        date: dateKey,
        studyMinutes: heatmapData[dateKey] || 0,
        day: date.getDay()
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get Heatmap Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching heatmap data',
      error: error.message
    });
  }
};

// @desc    Get peak study hours
// @route   GET /api/dashboard/peak-hours
// @access  Private
exports.getPeakHours = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await StudySession.find({
      userId,
      type: 'focus'
    });

    // Group by hour
    const hourData = {};
    for (let i = 0; i <= 23; i++) {
      hourData[i] = 0;
    }

    sessions.forEach(session => {
      const hour = new Date(session.date).getHours();
      hourData[hour] += session.duration;
    });

    // Format for frontend
    const result = [];
    for (let i = 6; i <= 23; i++) {
      result.push({
        hour: i,
        label: `${i > 12 ? i - 12 : i} ${i >= 12 ? 'PM' : 'AM'}`,
        minutes: hourData[i] || 0
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get Peak Hours Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching peak hours',
      error: error.message
    });
  }
};

// @desc    Get subject mastery data
// @route   GET /api/dashboard/subject-mastery
// @access  Private
exports.getSubjectMastery = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all subjects from sessions, goals, and notes
    const sessions = await StudySession.find({ userId, type: 'focus' });
    const goals = await Goal.find({ userId });
    const notes = await Note.find({ userId });

    const subjectData = {};

    // Calculate metrics for each subject
    const subjects = [...new Set([
      ...sessions.map(s => s.subject),
      ...goals.map(g => g.subject),
      ...notes.map(n => n.subject)
    ])];

    subjects.forEach(subject => {
      // Study time (understanding proxy)
      const subjectSessions = sessions.filter(s => s.subject === subject);
      const totalTime = subjectSessions.reduce((sum, s) => sum + s.duration, 0);
      const understanding = Math.min(Math.round((totalTime / 600) * 100), 100); // 600min = 100%

      // Practice (number of sessions)
      const practice = Math.min(Math.round((subjectSessions.length / 20) * 100), 100); // 20 sessions = 100%

      // Notes quality (number of notes)
      const subjectNotes = notes.filter(n => n.subject === subject);
      const notesQuality = Math.min(Math.round((subjectNotes.length / 10) * 100), 100); // 10 notes = 100%

      // Revision frequency (recent sessions)
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);
      const recentSessions = subjectSessions.filter(s => new Date(s.date) >= last7Days);
      const revisionFrequency = Math.min(Math.round((recentSessions.length / 7) * 100), 100); // Daily = 100%

      // Confidence (average of all metrics)
      const confidence = Math.round((understanding + practice + notesQuality + revisionFrequency) / 4);

      if (understanding > 0 || practice > 0 || notesQuality > 0) {
        subjectData[subject] = {
          subject,
          understanding,
          practice,
          notesQuality,
          revisionFrequency,
          confidence
        };
      }
    });

    res.status(200).json({
      success: true,
      data: Object.values(subjectData)
    });
  } catch (error) {
    console.error('Get Subject Mastery Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subject mastery',
      error: error.message
    });
  }
};

// Helper function to calculate streak
async function calculateStreak(userId) {
  const sessions = await StudySession.find({
    userId,
    type: 'focus'
  }).sort({ date: -1 });

  if (sessions.length === 0) {
    return { current: 0, longest: 0 };
  }

  let current = 0;
  let longest = 0;
  let tempStreak = 0;
  let lastDate = null;

  // Group sessions by date
  const dateMap = {};
  sessions.forEach(session => {
    const dateKey = session.date.toISOString().split('T')[0];
    dateMap[dateKey] = true;
  });

  const dates = Object.keys(dateMap).sort().reverse();

  // Calculate current streak
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().split('T')[0];

  if (dateMap[today] || dateMap[yesterdayKey]) {
    current = 1;
    let checkDate = new Date(dateMap[today] ? today : yesterdayKey);
    
    for (let i = 1; i < dates.length; i++) {
      const prevDate = new Date(checkDate);
      prevDate.setDate(prevDate.getDate() - 1);
      const prevKey = prevDate.toISOString().split('T')[0];
      
      if (dateMap[prevKey]) {
        current++;
        checkDate = prevDate;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  tempStreak = 1;
  for (let i = 1; i < dates.length; i++) {
    const currDate = new Date(dates[i]);
    const prevDate = new Date(dates[i - 1]);
    const diffDays = Math.round((prevDate - currDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      tempStreak++;
      longest = Math.max(longest, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  longest = Math.max(longest, current);

  return { current, longest };
}

module.exports.calculateStreak = calculateStreak;