import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, BookOpen, Target, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GoalModal({ goal, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    difficulty: 5,
    description: '',
    deadline: '',
    milestones: []
  });
  const [newMilestone, setNewMilestone] = useState('');

  useEffect(() => {
    if (goal) {
      setFormData({
        title: goal.title || '',
        subject: goal.subject || '',
        difficulty: goal.difficulty || 5,
        description: goal.description || '',
        deadline: goal.deadline?.split('T')[0] || '',
        milestones: goal.milestones || []
      });
    }
  }, [goal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a goal title');
      return;
    }
    
    if (!formData.deadline) {
      alert('Please select a deadline');
      return;
    }
    
    if (formData.milestones.length === 0) {
      alert('Please add at least one milestone');
      return;
    }

    onSave(formData);
  };

  const handleAddMilestone = () => {
    if (newMilestone.trim()) {
      setFormData({
        ...formData,
        milestones: [
          ...formData.milestones,
          { title: newMilestone.trim() }
        ]
      });
      setNewMilestone('');
    }
  };

  const handleRemoveMilestone = (index) => {
    setFormData({
      ...formData,
      milestones: formData.milestones.filter((_, i) => i !== index)
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1e1b4b] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {goal ? 'Edit Goal' : 'Create New Goal'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Target size={16} />
                Goal Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Complete DBMS Unit 2"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#8AC6D1] dark:focus:border-[#3b82f6] transition-all"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <BookOpen size={16} />
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="e.g., Database Management"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#8AC6D1] dark:focus:border-[#3b82f6] transition-all"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty Level: {formData.difficulty}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#8AC6D1] dark:accent-[#3b82f6]"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Easy</span>
                <span>Hard</span>
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar size={16} />
                Deadline
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#8AC6D1] dark:focus:border-[#3b82f6] transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Add any additional details..."
                rows="3"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#8AC6D1] dark:focus:border-[#3b82f6] transition-all resize-none"
              />
            </div>

            {/* Milestones */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Milestones
              </label>
              
              {/* Add Milestone */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMilestone())}
                  placeholder="Add a milestone..."
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#8AC6D1] dark:focus:border-[#3b82f6] transition-all"
                />
                <button
                  type="button"
                  onClick={handleAddMilestone}
                  className="px-4 py-2 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Milestone List */}
              <div className="space-y-2">
                {formData.milestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {milestone.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(idx)}
                      className="p-1 hover:bg-red-50 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Save size={18} />
            {goal ? 'Update Goal' : 'Create Goal'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}