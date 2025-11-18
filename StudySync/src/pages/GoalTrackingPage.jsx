import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Plus, Flame, TrendingUp, Award, LogOut, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GoalCard from '../components/Goals/GoalCard';
import GoalModal from '../components/Goals/GoalModal';
import StreakHeatmap from '../components/Goals/StreakHeatmap';
import BadgeShelf from '../components/Goals/BadgeShelf';
import SmartRecommendations from '../components/Goals/SmartRecommendations';

export default function GoalTrackingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [stats, setStats] = useState({
    totalGoals: 0,
    completed: 0,
    inProgress: 0,
    successRate: 0
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    loadGoals();
    loadStreak();
    loadBadges();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [goals]);

  const loadGoals = () => {
    const savedGoals = JSON.parse(localStorage.getItem('studysync_goals') || '[]');
    setGoals(savedGoals);
  };

  const saveGoals = (updatedGoals) => {
    localStorage.setItem('studysync_goals', JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  const loadStreak = () => {
    const streakData = JSON.parse(localStorage.getItem('studysync_streak') || '{"current": 0, "longest": 0, "history": []}');
    setStreak(streakData.current);
  };

  const loadBadges = () => {
    const savedBadges = JSON.parse(localStorage.getItem('studysync_badges') || '[]');
    setBadges(savedBadges);
  };

  const calculateStats = () => {
    const total = goals.length;
    const completed = goals.filter(g => g.isCompleted).length;
    const inProgress = goals.filter(g => !g.isCompleted).length;
    const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    setStats({
      totalGoals: total,
      completed,
      inProgress,
      successRate
    });
  };

  const handleCreateGoal = (goalData) => {
    const newGoal = {
      ...goalData,
      id: Date.now().toString(),
      userId: user?.id || 'demo',
      progress: 0,
      isCompleted: false,
      milestones: goalData.milestones.map(m => ({
        id: Date.now() + Math.random(),
        title: m.title,
        isDone: false,
        createdAt: new Date().toISOString()
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedGoals = [newGoal, ...goals];
    saveGoals(updatedGoals);
    setIsModalOpen(false);
    
    showNotification('Goal created successfully! 🎯');
  };

  const handleUpdateGoal = (goalData) => {
    const updatedGoals = goals.map(g => 
      g.id === editingGoal.id 
        ? { 
            ...goalData, 
            id: g.id, 
            userId: g.userId,
            progress: g.progress,
            isCompleted: g.isCompleted,
            createdAt: g.createdAt,
            updatedAt: new Date().toISOString() 
          }
        : g
    );
    
    saveGoals(updatedGoals);
    setIsModalOpen(false);
    setEditingGoal(null);
    showNotification('Goal updated successfully! ✨');
  };

  const handleDeleteGoal = (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      const updatedGoals = goals.filter(g => g.id !== goalId);
      saveGoals(updatedGoals);
      showNotification('Goal deleted');
    }
  };

  const handleToggleMilestone = (goalId, milestoneId) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(m => 
          m.id === milestoneId ? { ...m, isDone: !m.isDone } : m
        );
        
        const completedMilestones = updatedMilestones.filter(m => m.isDone).length;
        const progress = Math.round((completedMilestones / updatedMilestones.length) * 100);
        const isCompleted = progress === 100;
        
        if (isCompleted && !goal.isCompleted) {
          checkAndAwardBadges();
          updateStreak();
          showCelebration();
        }
        
        return {
          ...goal,
          milestones: updatedMilestones,
          progress,
          isCompleted,
          updatedAt: new Date().toISOString()
        };
      }
      return goal;
    });
    
    saveGoals(updatedGoals);
  };

  const checkAndAwardBadges = () => {
    const newBadges = [...badges];
    const completedGoals = goals.filter(g => g.isCompleted).length + 1;

    const badgeDefinitions = [
      { id: 'beginner', name: 'Beginner Achiever', description: '3 goals completed', icon: '🏅', threshold: 3 },
      { id: 'consistency', name: 'Consistency King', description: '7-day streak', icon: '🔥', threshold: 7, type: 'streak' },
      { id: 'quick', name: 'Quick Finisher', description: 'Completed before deadline', icon: '⚡', type: 'deadline' },
      { id: 'master', name: 'Goal Master', description: '10 goals completed', icon: '🌟', threshold: 10 },
    ];

    badgeDefinitions.forEach(badge => {
      const alreadyEarned = newBadges.some(b => b.id === badge.id);
      
      if (!alreadyEarned) {
        if (badge.type === 'streak' && streak >= badge.threshold) {
          newBadges.push({ ...badge, earnedAt: new Date().toISOString() });
          showNotification(`🎉 Badge Unlocked: ${badge.name}!`);
        } else if (!badge.type && completedGoals >= badge.threshold) {
          newBadges.push({ ...badge, earnedAt: new Date().toISOString() });
          showNotification(`🎉 Badge Unlocked: ${badge.name}!`);
        }
      }
    });

    localStorage.setItem('studysync_badges', JSON.stringify(newBadges));
    setBadges(newBadges);
  };

  const updateStreak = () => {
    const streakData = JSON.parse(localStorage.getItem('studysync_streak') || '{"current": 0, "longest": 0, "history": []}');
    const today = new Date().toDateString();
    
    const todayEntry = streakData.history.find(h => h.date === today);
    if (!todayEntry) {
      streakData.current += 1;
      streakData.longest = Math.max(streakData.current, streakData.longest);
      streakData.history.push({ date: today, completed: true });
      
      localStorage.setItem('studysync_streak', JSON.stringify(streakData));
      setStreak(streakData.current);
    }
  };

  const showCelebration = () => {
    showNotification('🎉 Goal Completed! Amazing work!');
  };

  const showNotification = (message) => {
    console.log(message);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const activeGoals = goals.filter(g => !g.isCompleted);
  const completedGoals = goals.filter(g => g.isCompleted);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#312e81] transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white/90 dark:bg-white/10 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <h1 
                onClick={() => navigate('/dashboard')}
                className="text-2xl font-bold bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] bg-clip-text text-transparent cursor-pointer"
              >
                StudySync
              </h1>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#A3BFFA]/20 to-[#8AC6D1]/20 dark:from-[#3b82f6]/20 dark:to-[#ec4899]/20 rounded-full">
                <Target size={18} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Goal Tracking</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#FFD6A5] to-[#FF9A8B] dark:from-[#ec4899] dark:to-[#8b5cf6] rounded-full">
                <Flame size={18} className="text-white" />
                <span className="text-sm font-bold text-white">{streak} day streak</span>
              </div>
              
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-white/10 rounded-full">
                <TrendingUp size={18} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {stats.successRate}% success
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/30 border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-300 rounded-lg transition-all"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Your Goals Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {stats.totalGoals} total • {stats.completed} completed • {stats.inProgress} in progress
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingGoal(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all"
          >
            <Plus size={20} />
            New Goal
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SmartRecommendations goals={goals} streak={streak} />

            {activeGoals.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Target size={20} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
                  Active Goals ({activeGoals.length})
                </h3>
                <div className="space-y-4">
                  <AnimatePresence>
                    {activeGoals.map((goal, index) => (
                      <GoalCard
                        key={goal.id}
                        goal={goal}
                        index={index}
                        onEdit={() => {
                          setEditingGoal(goal);
                          setIsModalOpen(true);
                        }}
                        onDelete={() => handleDeleteGoal(goal.id)}
                        onToggleMilestone={handleToggleMilestone}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {completedGoals.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Award size={20} className="text-green-500" />
                  Completed Goals ({completedGoals.length})
                </h3>
                <div className="space-y-4">
                  {completedGoals.slice(0, 3).map((goal, index) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      index={index}
                      onEdit={() => {
                        setEditingGoal(goal);
                        setIsModalOpen(true);
                      }}
                      onDelete={() => handleDeleteGoal(goal.id)}
                      onToggleMilestone={handleToggleMilestone}
                    />
                  ))}
                </div>
              </div>
            )}

            {goals.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1e1b4b] border-2 border-dashed border-gray-300 dark:border-white/20 rounded-2xl p-12 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] dark:from-[#3b82f6]/20 dark:to-[#ec4899]/20 flex items-center justify-center">
                  <Target size={40} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  Set Your First Goal
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                  Transform your academic dreams into achievable milestones. Start tracking your progress today!
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Create Your First Goal
                </button>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <StreakHeatmap streak={streak} />
            <BadgeShelf badges={badges} totalGoals={stats.completed} streak={streak} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <GoalModal
            goal={editingGoal}
            onSave={editingGoal ? handleUpdateGoal : handleCreateGoal}
            onClose={() => {
              setIsModalOpen(false);
              setEditingGoal(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}