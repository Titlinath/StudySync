import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, BookOpen, Target, TrendingUp, ArrowRight } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeGoals: 0,
    streak: 0,
    subjects: 0,
    progress: 0,
    todayStudyTime: 0,
    todayStudyHours: 0,
    todayStudyMinutes: 0,
    todayProgress: 0
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/auth?mode=login');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // If error, keep default zero values
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const statCards = [
    {
      icon: Target,
      label: 'Active Goals',
      value: loading ? '...' : stats.activeGoals.toString(),
      lightGradient: 'from-[#8AC6D1] to-[#A3BFFA]',
      darkGradient: 'dark:from-[#3b82f6] dark:to-[#8b5cf6]',
      darkBorder: 'dark:border-blue-500/30',
      darkBg: 'dark:bg-blue-500/10',
      darkGlow: 'dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]',
      darkText: 'dark:text-blue-300',
    },
    {
      icon: Calendar,
      label: 'Days Streak',
      value: loading ? '...' : stats.streak.toString(),
      lightGradient: 'from-[#FF9A8B] to-[#FFD6A5]',
      darkGradient: 'dark:from-[#ec4899] dark:to-[#f97316]',
      darkBorder: 'dark:border-pink-500/30',
      darkBg: 'dark:bg-pink-500/10',
      darkGlow: 'dark:hover:shadow-[0_0_30px_rgba(236,72,153,0.35)]',
      darkText: 'dark:text-pink-300',
    },
    {
      icon: BookOpen,
      label: 'Subjects',
      value: loading ? '...' : stats.subjects.toString(),
      lightGradient: 'from-[#DFF6F0] to-[#8AC6D1]',
      darkGradient: 'dark:from-[#06b6d4] dark:to-[#3b82f6]',
      darkBorder: 'dark:border-cyan-500/30',
      darkBg: 'dark:bg-cyan-500/10',
      darkGlow: 'dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]',
      darkText: 'dark:text-cyan-300',
    },
    {
      icon: TrendingUp,
      label: 'Progress',
      value: loading ? '...' : `${stats.progress}%`,
      lightGradient: 'from-[#E8DFF5] to-[#A3BFFA]',
      darkGradient: 'dark:from-[#8b5cf6] dark:to-[#ec4899]',
      darkBorder: 'dark:border-purple-500/30',
      darkBg: 'dark:bg-purple-500/10',
      darkGlow: 'dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]',
      darkText: 'dark:text-purple-300',
    },
  ];

  const quickLinks = [
    { label: 'Study Planner', route: '/planner', light: 'from-[#8AC6D1] to-[#A3BFFA]', dark: 'dark:from-[#3b82f6] dark:to-[#8b5cf6]' },
    { label: 'Focus Timer', route: '/focus-timer', light: 'from-[#FF9A8B] to-[#FFD6A5]', dark: 'dark:from-[#ec4899] dark:to-[#f97316]' },
    { label: 'My Notes', route: '/notes', light: 'from-[#DFF6F0] to-[#8AC6D1]', dark: 'dark:from-[#06b6d4] dark:to-[#3b82f6]' },
    { label: 'Goals', route: '/goals', light: 'from-[#E8DFF5] to-[#A3BFFA]', dark: 'dark:from-[#8b5cf6] dark:to-[#ec4899]' },
    { label: 'Analytics', route: '/analytics', light: 'from-[#FFD6A5] to-[#FF9A8B]', dark: 'dark:from-[#f97316] dark:to-[#ec4899]' },
    { label: 'Motivation', route: '/motivation', light: 'from-[#A3BFFA] to-[#8AC6D1]', dark: 'dark:from-[#3b82f6] dark:to-[#06b6d4]' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#312e81] transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white/90 dark:bg-white/5 dark:backdrop-blur-md dark:border-b dark:border-white/10 shadow-md dark:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] bg-clip-text text-transparent">
              StudySync
            </h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Welcome, <span className="dark:text-white font-semibold">{user?.name}!</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 rounded-lg transition-all duration-200 dark:hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {loading ? 'Loading your study overview...' : "Here's your study overview for today."}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, idx) => (
            <div
              key={idx}
              className={`
                bg-white rounded-xl p-6 shadow-md transition-all duration-300 cursor-default
                hover:scale-105 hover:shadow-xl
                dark:backdrop-blur-sm dark:border
                ${stat.darkBg} ${stat.darkBorder} ${stat.darkGlow}
              `}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.lightGradient} ${stat.darkGradient} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold text-gray-800 ${stat.darkText} mt-1`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Today's Progress */}
        <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm dark:border dark:border-white/10 rounded-2xl p-6 shadow-md dark:shadow-[0_0_30px_rgba(59,130,246,0.1)] mb-10 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Today's Progress</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {loading 
              ? 'Loading...' 
              : `${stats.todayStudyHours}h ${stats.todayStudyMinutes}m studied • ${stats.todayProgress}% complete`
            }
          </p>
          <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#ec4899] transition-all duration-500"
              style={{ width: loading ? '0%' : `${stats.todayProgress}%` }}
            />
          </div>
          
          {/* Empty State Message */}
          {!loading && stats.todayStudyTime === 0 && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 Start your first study session today! Use the Focus Timer to track your progress.
              </p>
            </div>
          )}
        </div>

        {/* Quick Access */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-5">Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => navigate(link.route)}
              className={`
                group flex flex-col items-center justify-center gap-2 p-4 rounded-xl font-semibold text-sm text-white
                bg-gradient-to-br ${link.light} ${link.dark}
                hover:scale-105 hover:shadow-xl transition-all duration-300
                dark:hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]
              `}
            >
              <span>{link.label}</span>
              <ArrowRight size={16} className="opacity-70 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}