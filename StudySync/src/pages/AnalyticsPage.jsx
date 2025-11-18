import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Brain, Clock, TrendingUp, Target, MessageSquare, LogOut, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductivityHeatmap from '../components/Analytics/ProductivityHeatmap';
import PeakHourChart from '../components/Analytics/PeakHourChart';
import SubjectMasteryRadar from '../components/Analytics/SubjectMasteryRadar';
import NoteQualityAnalysis from '../components/Analytics/NoteQualityAnalysis';
import RevisionPredictionGraph from '../components/Analytics/RevisionPredictionGraph';
import WeakAreaList from '../components/Analytics/WeakAreaList';
import AIAssistantChat from '../components/Analytics/AIAssistantChat';
import AnalyticsCard from '../components/Analytics/AnalyticsCard';

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  
  // Analytics data
  const [productivityData, setProductivityData] = useState(null);
  const [subjectMastery, setSubjectMastery] = useState([]);
  const [noteQuality, setNoteQuality] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);
  const [revisionData, setRevisionData] = useState([]);
  const [peakHours, setPeakHours] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setLoading(true);
    
    // Simulate loading analytics data
    // In production, this would fetch from your backend API
    setTimeout(() => {
      // Generate mock data for demonstration
      setProductivityData(generateProductivityData());
      setSubjectMastery(generateSubjectMastery());
      setNoteQuality(generateNoteQuality());
      setWeakAreas(generateWeakAreas());
      setRevisionData(generateRevisionData());
      setPeakHours(generatePeakHours());
      setLoading(false);
    }, 1500);
  };

  // Mock data generators
  const generateProductivityData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 83; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        studyMinutes: Math.random() > 0.3 ? Math.floor(Math.random() * 180) + 30 : 0,
        day: date.getDay()
      });
    }
    return data;
  };

  const generateSubjectMastery = () => {
    return [
      {
        subject: 'Database Management',
        understanding: 85,
        practice: 75,
        notesQuality: 90,
        revisionFrequency: 70,
        confidence: 80
      },
      {
        subject: 'Data Structures',
        understanding: 70,
        practice: 80,
        notesQuality: 75,
        revisionFrequency: 65,
        confidence: 72
      },
      {
        subject: 'Operating Systems',
        understanding: 60,
        practice: 55,
        notesQuality: 65,
        revisionFrequency: 50,
        confidence: 58
      },
      {
        subject: 'Computer Networks',
        understanding: 75,
        practice: 70,
        notesQuality: 80,
        revisionFrequency: 68,
        confidence: 73
      }
    ];
  };

  const generateNoteQuality = () => {
    return {
      averageDepth: 78,
      averageClarity: 82,
      averageStructure: 75,
      totalNotes: 24,
      analyzedNotes: 18,
      topNote: {
        title: 'DBMS Normalization',
        depth: 92,
        clarity: 88,
        structure: 90
      }
    };
  };

  const generateWeakAreas = () => {
    return [
      {
        topic: 'Recursion in Trees',
        subject: 'Data Structures',
        severity: 'high',
        reason: 'Low practice frequency',
        suggestion: 'Complete 10 tree recursion problems'
      },
      {
        topic: 'Deadlock Prevention',
        subject: 'Operating Systems',
        severity: 'medium',
        reason: 'Notes lack examples',
        suggestion: 'Add real-world scenarios'
      },
      {
        topic: 'TCP/IP Protocol',
        subject: 'Computer Networks',
        severity: 'medium',
        reason: 'Missing revision',
        suggestion: 'Review within 3 days'
      }
    ];
  };

  const generateRevisionData = () => {
    return [
      { day: 0, retention: 100, label: 'Today' },
      { day: 1, retention: 95, label: 'Day 1' },
      { day: 3, retention: 85, label: 'Day 3' },
      { day: 7, retention: 70, label: 'Week 1' },
      { day: 14, retention: 55, label: 'Week 2' },
      { day: 30, retention: 35, label: 'Month 1' }
    ];
  };

  const generatePeakHours = () => {
    const hours = [];
    for (let i = 6; i <= 23; i++) {
      hours.push({
        hour: i,
        label: `${i > 12 ? i - 12 : i} ${i >= 12 ? 'PM' : 'AM'}`,
        minutes: Math.floor(Math.random() * 120)
      });
    }
    return hours;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Calculate stats
  const totalStudyTime = productivityData 
    ? productivityData.reduce((sum, d) => sum + d.studyMinutes, 0) 
    : 0;
  const avgDailyTime = productivityData 
    ? Math.round(totalStudyTime / productivityData.length) 
    : 0;
  const studyDays = productivityData 
    ? productivityData.filter(d => d.studyMinutes > 0).length 
    : 0;
  const avgMastery = subjectMastery.length 
    ? Math.round(subjectMastery.reduce((sum, s) => sum + s.understanding, 0) / subjectMastery.length) 
    : 0;

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
                onClick={() => setShowChat(!showChat)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all shadow-lg"
              >
                <MessageSquare size={18} />
                AI Assistant
              </button>
              
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
            AI-powered insights into your study patterns, mastery, and growth
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <AnalyticsCard
            icon={Clock}
            title="Total Study Time"
            value={`${Math.floor(totalStudyTime / 60)}h ${totalStudyTime % 60}m`}
            subtitle={`${avgDailyTime}min/day avg`}
            color="from-blue-400 to-cyan-500"
          />
          <AnalyticsCard
            icon={TrendingUp}
            title="Active Days"
            value={`${studyDays} days`}
            subtitle={`${Math.round((studyDays / 84) * 100)}% consistency`}
            color="from-green-400 to-emerald-500"
          />
          <AnalyticsCard
            icon={Brain}
            title="Avg Mastery"
            value={`${avgMastery}%`}
            subtitle={`${subjectMastery.length} subjects`}
            color="from-purple-400 to-pink-500"
          />
          <AnalyticsCard
            icon={Target}
            title="Weak Areas"
            value={weakAreas.length}
            subtitle="Need attention"
            color="from-orange-400 to-red-500"
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Productivity Heatmap */}
            <ProductivityHeatmap data={productivityData} loading={loading} />
            
            {/* Peak Hours */}
            <PeakHourChart data={peakHours} loading={loading} />
            
            {/* Subject Mastery */}
            <SubjectMasteryRadar data={subjectMastery} loading={loading} />
            
            {/* Revision Prediction */}
            <RevisionPredictionGraph data={revisionData} loading={loading} />
          </div>

          {/* Right Column - Insights */}
          <div className="lg:col-span-1 space-y-6">
            {/* Note Quality */}
            <NoteQualityAnalysis data={noteQuality} loading={loading} />
            
            {/* Weak Areas */}
            <WeakAreaList areas={weakAreas} loading={loading} />
          </div>
        </div>
      </div>

      {/* AI Chat Sidebar */}
      {showChat && (
        <AIAssistantChat 
          onClose={() => setShowChat(false)}
          userData={{ subjectMastery, weakAreas, noteQuality }}
        />
      )}
    </div>
  );
}