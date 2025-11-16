import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    const newTag = inputValue.trim().toLowerCase();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const tagColors = [
    'from-[#A3BFFA] to-[#8AC6D1]',
    'from-[#FF9A8B] to-[#FFD6A5]',
    'from-[#DFF6F0] to-[#8AC6D1]',
    'from-[#E8DFF5] to-[#A3BFFA]',
  ];

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag..."
          className="flex-1 px-4 py-2 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#8AC6D1] dark:focus:border-[#3b82f6] transition-all"
        />
        <button
          onClick={handleAddTag}
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-lg font-semibold hover:shadow-md transition-all"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${tagColors[index % tagColors.length]} text-white rounded-full text-sm font-medium shadow-sm`}
            >
              <span>#{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                type="button"
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}