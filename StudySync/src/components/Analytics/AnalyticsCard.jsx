import React from 'react';
import { motion } from 'framer-motion';

export default function AnalyticsCard({ icon: Icon, title, value, subtitle, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${color} rounded-lg shadow-md`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
          {value}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    </motion.div>
  );
}