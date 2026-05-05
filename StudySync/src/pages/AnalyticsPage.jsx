import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Brain, Clock, TrendingUp, Target, MessageSquare, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductivityHeatmap from '../components/Analytics/ProductivityHeatmap';
import PeakHourChart from '../components/Analytics/PeakHourChart';
import SubjectMasteryRadar from '../components/Analytics/SubjectMasteryRadar';
import NoteQualityAnalysis from '../components/Analytics/NoteQualityAnalysis';
import RevisionPredictionGraph from '../components/Analytics/RevisionPredictionGraph';
import WeakAreaList from '../components/Analytics/WeakAreaList';
import AIAssistantChat from '../components/Analytics/AIAssistantChat';
import AnalyticsCard from '../components/Analytics/AnalyticsCard';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  
  // Analytics data - ALL START AT ZERO/EMPTY
  const [productivityData, setProductivityData] = useState([]);
  const [subjectMastery, setSubjectMastery] = useState([]);
  const [noteQuality, setNoteQuality] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);
  const [revisionData, setRevisionData] = useState([]);
  const [peakHours, setPeakHours] = useState([]);
  
  // Stats - ALL START AT ZERO
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [avgDailyTime, setAvgDailyTime] = useState(0);
  const [studyDays, setStudyDays] = useState(0);
  const [avgMastery, setAvgMastery] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/auth?mode=login');
      return;
    }

    try {
      // Fetch all analytics data from backend
      const [heatmapRes, peakHoursRes, masteryRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/dashboard/heatmap`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get(`${API_BASE_URL}/dashboard/peak-hours`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get(`${API_BASE_URL}/dashboard/subject-mastery`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      // Set heatmap data (or empty array)
      const heatmap = heatmapRes.data.success ? heatmapRes.data.data : [];
      setProductivityData(heatmap);

      // Calculate stats from heatmap
      if (heatmap.length > 0) {
        const total = heatmap.reduce((sum, d) => sum + d.studyMinutes, 0);
        const days = heatmap.filter(d => d.studyMinutes > 0).length;
        
        setTotalStudyTime(total);
        setAvgDailyTime(days > 0 ? Math.round(total / days) : 0);
        setStudyDays(days);
      }

      // Set peak hours (or empty array)
      setPeakHours(peakHoursRes.data.success ? peakHoursRes.data.data : []);

      // Set subject mastery (or empty array)
      const mastery = masteryRes.data.success ? masteryRes.data.data : [];
      setSubjectMastery(mastery);
      
      if (mastery.length > 0) {
        const avg = Math.round(mastery.reduce((sum, s) => sum + s.understanding, 0) / mastery.length);
        setAvgMastery(avg);
      }

      // Set default revision data (static for now)
      setRevisionData([
        { day: 0, retention: 100, label: 'Today' },
        { day: 1, retention: 95, label: 'Day 1' },
        { day: 3, retention: 85, label: 'Day 3' },
        { day: 7, retention: 70, label: 'Week 1' },
        { day: 14, retention: 55, label: 'Week 2' },
        { day: 30, retention: 35, label: 'Month 1' }
      ]);

      // TODO: Fetch note quality and weak areas from backend when ready
      
    } catch (error) {
      console.error('Error loading analytics:', error);
      
      if (error.response?.status === 401) {
        handleLogout();
      }
      
      // On error, keep all data empty/zero (already set as default)
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

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
                <BarChart3 size={18} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Visual Analytics</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Your Learning Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {loading ? 'Loading your insights...' : 'AI-powered insights into your study patterns, mastery, and growth'}
          </p>
        </div>

        {/* Quick Stats - ALL SHOW ZERO FOR NEW USERS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <AnalyticsCard
            icon={Clock}
            title="Total Study Time"
            value={loading ? '...' : `${Math.floor(totalStudyTime / 60)}h ${totalStudyTime % 60}m`}
            subtitle={`${avgDailyTime}min/day avg`}
            color="from-blue-400 to-cyan-500"
          />
          <AnalyticsCard
            icon={TrendingUp}
            title="Active Days"
            value={loading ? '...' : `${studyDays} days`}
            subtitle={`${studyDays > 0 ? Math.round((studyDays / 84) * 100) : 0}% consistency`}
            color="from-green-400 to-emerald-500"
          />
          <AnalyticsCard
            icon={Brain}
            title="Avg Mastery"
            value={loading ? '...' : `${avgMastery}%`}
            subtitle={`${subjectMastery.length} subjects`}
            color="from-purple-400 to-pink-500"
          />
          <AnalyticsCard
            icon={Target}
            title="Weak Areas"
            value={loading ? '...' : weakAreas.length}
            subtitle={weakAreas.length > 0 ? "Need attention" : "All good!"}
            color="from-orange-400 to-red-500"
          />
        </div>

        {/* Empty State for New Users */}
        {!loading && totalStudyTime === 0 && subjectMastery.length === 0 && (
          <div className="bg-white dark:bg-[#1e1b4b] border-2 border-dashed border-gray-300 dark:border-white/20 rounded-2xl p-12 text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] dark:from-[#3b82f6]/20 dark:to-[#ec4899]/20 flex items-center justify-center">
              <BarChart3 size={40} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              No Analytics Data Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Start using the Focus Timer and creating goals to see your analytics here. Your study patterns, peak hours, and subject mastery will appear as you study.
            </p>
            <button
              onClick={() => navigate('/focus-timer')}
              className="px-8 py-3 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Start Your First Session
            </button>
          </div>
        )}

        {/* Main Grid - Only show if data exists */}
        {!loading && (totalStudyTime > 0 || subjectMastery.length > 0) && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              <ProductivityHeatmap data={productivityData} loading={loading} />
              <PeakHourChart data={peakHours} loading={loading} />
              <SubjectMasteryRadar data={subjectMastery} loading={loading} />
              <RevisionPredictionGraph data={revisionData} loading={loading} />
            </div>

            {/* Right Column - Insights */}
            <div className="lg:col-span-1 space-y-6">
              <NoteQualityAnalysis data={noteQuality} loading={loading} />
              <WeakAreaList areas={weakAreas} loading={loading} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}