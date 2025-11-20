import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function MoodTracker({ currentMood, onMoodChange }) {
  const [showFeedback, setShowFeedback] = useState(false);

  const moods = [
    { emoji: '😢', value: 'sad', label: 'Struggling', color: 'from-gray-400 to-gray-600' },
    { emoji: '😐', value: 'meh', label: 'Meh', color: 'from-yellow-400 to-yellow-600' },
    { emoji: '🙂', value: 'okay', label: 'Okay', color: 'from-blue-400 to-blue-600' },
    { emoji: '😄', value: 'happy', label: 'Happy', color: 'from-green-400 to-green-600' },
    { emoji: '🔥', value: 'fire', label: 'On Fire', color: 'from-orange-400 to-red-600' }
  ];

  const getMoodFeedback = (mood) => {
    const feedback = {
      sad: "It's okay to have tough days. Let's start with just 5 minutes of study today. Small steps matter.",
      meh: "Feeling neutral? That's normal. Try a quick win to build momentum!",
      okay: "Solid! You're ready for focused work. Let's make today count.",
      happy: "Great energy! Channel this into your toughest subject today.",
      fire: "You're unstoppable! This is your moment to breakthrough. Go all in!"
    };
    return feedback[mood] || '';
  };

  const handleMoodClick = (mood) => {
    onMoodChange(mood);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-8"
    >
      <div className="bg-white/90 dark:bg-white/10 backdrop-blur-xl border-2 border-white dark:border-white/20 rounded-2xl p-6 shadow-lg">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 flex items-center justify-center gap-2">
            <Heart size={20} className="text-pink-500" />
            How are you feeling today?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your mood helps us personalize your experience
          </p>
        </div>

        {/* Mood Emojis */}
        <div className="flex items-center justify-center gap-3 md:gap-6 mb-4">
          {moods.map((mood, idx) => (
            <motion.button
              key={mood.value}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7 + idx * 0.1, type: "spring" }}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMoodClick(mood.value)}
              className={`relative group ${
                currentMood === mood.value 
                  ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-900' 
                  : ''
              }`}
              style={{
                boxShadow: currentMood === mood.value 
                  ? `0 0 20px ${mood.value === 'sad' ? '#9ca3af' : mood.value === 'meh' ? '#fbbf24' : mood.value === 'okay' ? '#60a5fa' : mood.value === 'happy' ? '#34d399' : '#f97316'}`
                  : 'none'
              }}
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${mood.color} flex items-center justify-center text-3xl md:text-4xl transition-all ${
                currentMood === mood.value ? 'shadow-2xl' : 'shadow-md hover:shadow-xl'
              }`}>
                {mood.emoji}
              </div>
              
              {/* Label */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {mood.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* AI Feedback */}
        {showFeedback && currentMood && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <Sparkles size={20} className="text-purple-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-1">
                  AI Insight
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {getMoodFeedback(currentMood)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}