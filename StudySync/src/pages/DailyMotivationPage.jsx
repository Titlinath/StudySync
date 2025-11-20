import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, LogOut, Heart, Trophy, TrendingUp, Users, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSection from '../components/Motivation/HeroSection';
import MoodTracker from '../components/Motivation/MoodTracker';
import QuoteCard from '../components/Motivation/QuoteCard';
import VisionTiles from '../components/Motivation/VisionTiles';
import DailyChallenge from '../components/Motivation/DailyChallenge';
import CommunityFeed from '../components/Motivation/CommunityFeed';
import AffirmationBoard from '../components/Motivation/AffirmationBoard';
import AiCoachChat from '../components/Motivation/AiCoachChat';
import CalmCorner from '../components/Motivation/CalmCorner';

export default function DailyMotivationPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showCalmCorner, setShowCalmCorner] = useState(false);
  
  // Motivation data
  const [dailyQuote, setDailyQuote] = useState(null);
  const [visionStats, setVisionStats] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [communityFeed, setCommunityFeed] = useState([]);
  const [affirmations, setAffirmations] = useState([]);
  const [currentMood, setCurrentMood] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
    
    loadDailyMotivation();
  }, []);

  const loadDailyMotivation = async () => {
    setLoading(true);
    
    // Simulate API call - In production, fetch from backend
    setTimeout(() => {
      setDailyQuote(generateDailyQuote());
      setVisionStats(generateVisionStats());
      setChallenge(generateDailyChallenge());
      setCommunityFeed(generateCommunityFeed());
      setAffirmations(loadAffirmations());
      setLoading(false);
    }, 1500);
  };

  const generateDailyQuote = () => {
    const quotes = [
      {
        text: "Your momentum is your power. 92% of people quit during momentum. You don't.",
        mode: 'focus',
        color: 'from-orange-400 to-red-500'
      },
      {
        text: "One day missed doesn't define you — getting up today does.",
        mode: 'calm',
        color: 'from-blue-400 to-purple-500'
      },
      {
        text: "Small steps compound into extraordinary results. Today's 10 minutes matter.",
        mode: 'accountability',
        color: 'from-green-400 to-cyan-500'
      },
      {
        text: "You're not behind. You're exactly where you need to be to grow.",
        mode: 'calm',
        color: 'from-pink-400 to-purple-500'
      }
    ];
    
    // In production: AI generates based on user data
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const generateVisionStats = () => {
    return {
      longestStreak: 12,
      currentStreak: 5,
      goalProgress: 25,
      peakHour: '3-5 PM',
      totalStudyTime: 1847,
      subjectName: 'DBMS'
    };
  };

  const generateDailyChallenge = () => {
    const challenges = [
      {
        title: 'Complete 25 minutes focus session',
        description: 'Start your day with deep work',
        icon: '🎯',
        xp: 50,
        completed: false
      },
      {
        title: 'Summarize 2 paragraphs of notes',
        description: 'Reinforce your learning',
        icon: '✍️',
        xp: 30,
        completed: false
      },
      {
        title: 'Solve 3 problems in weak subject',
        description: 'Turn weakness into strength',
        icon: '🧠',
        xp: 75,
        completed: false
      }
    ];
    
    return challenges[Math.floor(Math.random() * challenges.length)];
  };

  const generateCommunityFeed = () => {
    return [
      { id: 1, text: 'Someone just completed 45 minutes of study', time: '2m ago', icon: '📚' },
      { id: 2, text: 'A student finished their goal today', time: '5m ago', icon: '🎯' },
      { id: 3, text: '12 learners are studying right now', time: 'now', icon: '🔥' },
      { id: 4, text: 'Someone earned a 7-day streak badge', time: '8m ago', icon: '🏆' },
      { id: 5, text: 'A learner completed today\'s challenge', time: '12m ago', icon: '⭐' }
    ];
  };

  const loadAffirmations = () => {
    const saved = localStorage.getItem('studysync_affirmations');
    return saved ? JSON.parse(saved) : [
      'I am capable of learning anything I set my mind to',
      'Every study session makes me stronger',
      'I choose progress over perfection'
    ];
  };

  const handleMoodChange = (mood) => {
    setCurrentMood(mood);
    // Save to backend in production
    localStorage.setItem('studysync_today_mood', mood);
  };

  const handleChallengeComplete = () => {
    setChallenge({ ...challenge, completed: true });
    // Award XP and update backend
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const userName = user?.name?.split(' ')[0] || 'Friend';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5E5] via-[#FFF4E5] to-[#E5F4FF] dark:from-[#1a1625] dark:via-[#1e1b4b] dark:to-[#0f172a] transition-colors duration-300 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-500/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 dark:bg-pink-500/20 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300 dark:bg-blue-500/20 rounded-full blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Navbar */}
      <nav className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <h1 
                onClick={() => navigate('/dashboard')}
                className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent cursor-pointer"
              >
                StudySync
              </h1>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full">
                <Sparkles size={18} className="text-pink-500" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Daily Motivation</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCalmCorner(!showCalmCorner)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-500/20 hover:bg-blue-200 dark:hover:bg-blue-500/30 text-blue-600 dark:text-blue-400 rounded-lg transition-all"
              >
                <Music size={18} />
                Calm Corner
              </button>
              
              <button
                onClick={() => setShowChat(!showChat)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-500/20 hover:bg-purple-200 dark:hover:bg-purple-500/30 text-purple-600 dark:text-purple-400 rounded-lg transition-all"
              >
                <Heart size={18} />
                AI Coach
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <HeroSection userName={userName} loading={loading} />

        {/* Quote Card */}
        <QuoteCard quote={dailyQuote} loading={loading} />

        {/* Mood Tracker */}
        <MoodTracker currentMood={currentMood} onMoodChange={handleMoodChange} />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vision Tiles */}
            <VisionTiles stats={visionStats} loading={loading} />
            
            {/* Daily Challenge */}
            <DailyChallenge 
              challenge={challenge} 
              onComplete={handleChallengeComplete}
              loading={loading}
            />
            
            {/* Affirmation Board */}
            <AffirmationBoard affirmations={affirmations} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Community Feed */}
            <CommunityFeed feed={communityFeed} loading={loading} />
          </div>
        </div>
      </div>

      {/* AI Coach Chat */}
      {showChat && (
        <AiCoachChat 
          onClose={() => setShowChat(false)}
          userName={userName}
        />
      )}

      {/* Calm Corner */}
      {showCalmCorner && (
        <CalmCorner onClose={() => setShowCalmCorner(false)} />
      )}
    </div>
  );
}