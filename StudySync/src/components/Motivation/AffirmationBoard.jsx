import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, X, Sparkles } from 'lucide-react';

export default function AffirmationBoard({ affirmations: initialAffirmations }) {
  const [affirmations, setAffirmations] = useState(initialAffirmations || []);
  const [newAffirmation, setNewAffirmation] = useState('');
  const [showInput, setShowInput] = useState(false);

  const colors = [
    'from-pink-400 to-rose-500',
    'from-purple-400 to-indigo-500',
    'from-blue-400 to-cyan-500',
    'from-green-400 to-emerald-500',
    'from-yellow-400 to-orange-500',
    'from-red-400 to-pink-500'
  ];

  const handleAdd = () => {
    if (newAffirmation.trim()) {
      const updated = [...affirmations, newAffirmation.trim()];
      setAffirmations(updated);
      localStorage.setItem('studysync_affirmations', JSON.stringify(updated));
      setNewAffirmation('');
      setShowInput(false);
    }
  };

  const handleDelete = (index) => {
    const updated = affirmations.filter((_, i) => i !== index);
    setAffirmations(updated);
    localStorage.setItem('studysync_affirmations', JSON.stringify(updated));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 dark:bg-white/10 backdrop-blur-xl border-2 border-white dark:border-white/20 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-1">
            <Heart size={20} className="text-pink-500" />
            Your Affirmation Wall
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remind yourself why you're here
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowInput(!showInput)}
          className="p-2 bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-full shadow-lg"
        >
          {showInput ? <X size={20} /> : <Plus size={20} />}
        </motion.button>
      </div>

      {/* Add New Affirmation */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={newAffirmation}
                onChange={(e) => setNewAffirmation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                placeholder="I am capable of..."
                className="flex-1 px-4 py-3 bg-white dark:bg-white/10 border-2 border-gray-200 dark:border-white/20 rounded-xl text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-pink-500 dark:focus:border-pink-400 transition-all"
                autoFocus
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Add
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Affirmation Cards */}
      {affirmations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AnimatePresence>
            {affirmations.map((affirmation, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                whileHover={{ 
                  scale: 1.05,
                  rotateZ: Math.random() > 0.5 ? 2 : -2,
                  transition: { duration: 0.2 }
                }}
                className={`relative group p-4 bg-gradient-to-br ${colors[idx % colors.length]} rounded-xl shadow-lg cursor-pointer overflow-hidden`}
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(idx)}
                  className="absolute top-2 right-2 p-1 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={14} className="text-white" />
                </button>

                {/* Sparkle Icon */}
                <Sparkles size={16} className="text-white/50 mb-2" />

                {/* Affirmation Text */}
                <p className="text-white font-semibold leading-relaxed">
                  {affirmation}
                </p>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity transform -skew-x-12"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-500/20 dark:to-purple-500/20 flex items-center justify-center">
            <Heart size={32} className="text-pink-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No affirmations yet. Create your first one!
          </p>
          <button
            onClick={() => setShowInput(true)}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Add Affirmation
          </button>
        </div>
      )}

      {/* Inspirational Footer */}
      {affirmations.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10"
        >
          <p className="text-xs text-center text-gray-600 dark:text-gray-400 italic">
            "What you tell yourself matters. Keep these close to your heart." 💜
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}