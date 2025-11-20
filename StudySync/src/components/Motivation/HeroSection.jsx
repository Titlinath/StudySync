import React from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sparkles } from 'lucide-react';

export default function HeroSection({ userName, loading }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div className="mb-8 animate-pulse">
        <div className="h-12 bg-gray-200 dark:bg-white/10 rounded w-2/3 mb-2"></div>
        <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="inline-block mb-4"
      >
        <div className="relative">
          <Sunrise size={64} className="text-orange-500" />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-50"
          />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold mb-3"
      >
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          {getGreeting()}, {userName}! 
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2"
      >
        <Sparkles size={20} className="text-yellow-500" />
        Here's today's spark for consistency
      </motion.p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 0.6, duration: 1 }}
        className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full max-w-md mx-auto mt-4"
      />
    </motion.div>
  );
}