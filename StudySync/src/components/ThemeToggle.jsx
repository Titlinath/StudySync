import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#8AC6D1] dark:focus:ring-[#3b82f6] focus:ring-offset-2"
      aria-label="Toggle theme"
    >
      {/* Toggle Circle */}
      <div
        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {theme === 'light' ? (
          <Sun size={14} className="text-yellow-500" />
        ) : (
          <Moon size={14} className="text-blue-400" />
        )}
      </div>
    </button>
  );
}