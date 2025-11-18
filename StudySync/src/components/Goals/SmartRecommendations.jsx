import React from 'react';
import { Sparkles, AlertCircle, TrendingUp, Clock, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SmartRecommendations({ goals, streak }) {
  const generateRecommendations = () => {
    const recommendations = [];
    const activeGoals = goals.filter(g => !g.isCompleted);
    const completedGoals = goals.filter(g => g.isCompleted);

    // Check for urgent deadlines
    const urgentGoals = activeGoals.filter(g => {
      const daysLeft = Math.ceil((new Date(g.deadline) - new Date()) / (1000 * 60 * 60 * 24));
      return daysLeft >= 0 && daysLeft <= 3;
    });

    if (urgentGoals.length > 0) {
      recommendations.push({
        id: 'urgent',
        icon: AlertCircle,
        color: 'from-orange-400 to-red-500',
        bgColor: 'from-orange-50 to-red-50 dark:from-orange-500/10 dark:to-red-500/10',
        borderColor: 'border-orange-300 dark:border-orange-500/30',
        title: 'Urgent Goals',
        description: `You have ${urgentGoals.length} goal${urgentGoals.length > 1 ? 's' : ''} due in the next 3 days. Focus on these first!`,
        action: urgentGoals[0].title
      });
    }

    // Check for overdue goals
    const overdueGoals = activeGoals.filter(g => {
      const daysLeft = Math.ceil((new Date(g.deadline) - new Date()) / (1000 * 60 * 60 * 24));
      return daysLeft < 0;
    });

    if (overdueGoals.length > 0) {
      recommendations.push({
        id: 'overdue',
        icon: Clock,
        color: 'from-red-500 to-red-700',
        bgColor: 'from-red-50 to-red-100 dark:from-red-500/10 dark:to-red-500/20',
        borderColor: 'border-red-300 dark:border-red-500/30',
        title: 'Overdue Goals',
        description: `${overdueGoals.length} goal${overdueGoals.length > 1 ? 's are' : ' is'} past the deadline. Consider extending or completing them soon.`,
        action: overdueGoals[0].title
      });
    }

    // Streak motivation
    if (streak > 0 && streak < 7) {
      recommendations.push({
        id: 'streak',
        icon: Zap,
        color: 'from-yellow-400 to-orange-500',
        bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-500/10 dark:to-orange-500/10',
        borderColor: 'border-yellow-300 dark:border-yellow-500/30',
        title: 'Keep the Momentum',
        description: `You're on a ${streak}-day streak! Complete a milestone today to keep it going and unlock badges.`,
        action: 'Maintain your streak'
      });
    }

    if (streak >= 7) {
      recommendations.push({
        id: 'streak-achievement',
        icon: Sparkles,
        color: 'from-purple-400 to-pink-500',
        bgColor: 'from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10',
        borderColor: 'border-purple-300 dark:border-purple-500/30',
        title: 'Amazing Consistency!',
        description: `Incredible! You've maintained a ${streak}-day streak. You're building a powerful study habit.`,
        action: 'Keep going!'
      });
    }

    // Progress insights
    const goalsWithHighProgress = activeGoals.filter(g => g.progress >= 70 && g.progress < 100);
    if (goalsWithHighProgress.length > 0) {
      recommendations.push({
        id: 'almost-done',
        icon: Target,
        color: 'from-green-400 to-blue-500',
        bgColor: 'from-green-50 to-blue-50 dark:from-green-500/10 dark:to-blue-500/10',
        borderColor: 'border-green-300 dark:border-green-500/30',
        title: 'Almost There!',
        description: `You're ${goalsWithHighProgress[0].progress}% done with "${goalsWithHighProgress[0].title}". One more push to complete it!`,
        action: goalsWithHighProgress[0].title
      });
    }

    // Subject performance
    const subjectStats = {};
    completedGoals.forEach(g => {
      if (g.subject) {
        subjectStats[g.subject] = (subjectStats[g.subject] || 0) + 1;
      }
    });

    const bestSubject = Object.entries(subjectStats).sort((a, b) => b[1] - a[1])[0];
    if (bestSubject && completedGoals.length >= 3) {
      recommendations.push({
        id: 'best-subject',
        icon: TrendingUp,
        color: 'from-blue-400 to-cyan-500',
        bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/10',
        borderColor: 'border-blue-300 dark:border-blue-500/30',
        title: 'Your Strongest Subject',
        description: `You've completed ${bestSubject[1]} goals in ${bestSubject[0]}! You're excelling in this area.`,
        action: `${bestSubject[0]} master`
      });
    }

    // Motivation when no active goals
    if (activeGoals.length === 0 && completedGoals.length > 0) {
      recommendations.push({
        id: 'new-goals',
        icon: Sparkles,
        color: 'from-indigo-400 to-purple-500',
        bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10',
        borderColor: 'border-indigo-300 dark:border-indigo-500/30',
        title: 'Set New Goals',
        description: `You've completed all your goals! Time to set new challenges and keep growing.`,
        action: 'Create new goal'
      });
    }

    // First goal encouragement
    if (goals.length === 0) {
      recommendations.push({
        id: 'first-goal',
        icon: Target,
        color: 'from-pink-400 to-rose-500',
        bgColor: 'from-pink-50 to-rose-50 dark:from-pink-500/10 dark:to-rose-500/10',
        borderColor: 'border-pink-300 dark:border-pink-500/30',
        title: 'Start Your Journey',
        description: 'Set your first goal and begin tracking your academic progress with milestones and achievements!',
        action: 'Create your first goal'
      });
    }

    return recommendations.slice(0, 3); // Show max 3 recommendations
  };

  const recommendations = generateRecommendations();

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <Sparkles size={20} className="text-purple-500" />
        Smart Insights
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec, idx) => {
          const Icon = rec.icon;
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden bg-gradient-to-br ${rec.bgColor} border-2 ${rec.borderColor} rounded-xl p-5 shadow-md hover:shadow-lg transition-all group`}
            >
              {/* Icon */}
              <div className={`inline-flex p-2 bg-gradient-to-br ${rec.color} rounded-lg mb-3 shadow-sm`}>
                <Icon size={20} className="text-white" />
              </div>

              {/* Content */}
              <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2">
                {rec.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                {rec.description}
              </p>

              {/* Action Tag */}
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-white/50 dark:bg-white/10 rounded-full">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                  {rec.action}
                </span>
              </div>

              {/* Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${rec.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}