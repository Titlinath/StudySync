import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Flame, Target, Zap, LogOut, BookOpen, Coffee, Brain, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CircularTimer from '../components/FocusTimer/CircularTimer';
import TimerControls from '../components/FocusTimer/TimerControls';
import SubjectSelector from '../components/FocusTimer/SubjectSelector';
import BreakSuggestions from '../components/FocusTimer/BreakSuggestions';
import FocusStats from '../components/FocusTimer/FocusStats';
import FocusModeOverlay from '../components/FocusTimer/FocusModeOverlay';

export default function FocusTimerPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('focus'); // 'focus', 'shortBreak', 'longBreak'
  const [sessions, setSessions] = useState(0);
  const [focusModeEnabled, setFocusModeEnabled] = useState(false);
  
  // Study Context
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  
  // Stats
  const [todayFocusTime, setTodayFocusTime] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  
  // Timer Durations (in minutes)
  const durations = {
    focus: 25,
    shortBreak: 5,
    longBreak: 15
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Load today's stats
    loadTodayStats();
  }, []);

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            handleTimerComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const loadTodayStats = () => {
    const stats = JSON.parse(localStorage.getItem('focusStats') || '{}');
    const today = new Date().toDateString();
    
    if (stats[today]) {
      setTodayFocusTime(stats[today].focusTime || 0);
      setCompletedCycles(stats[today].cycles || 0);
      setStreak(stats.streak || 0);
    }
  };

  const saveTodayStats = () => {
    const stats = JSON.parse(localStorage.getItem('focusStats') || '{}');
    const today = new Date().toDateString();
    
    if (!stats[today]) {
      stats[today] = { focusTime: 0, cycles: 0 };
    }
    
    if (timerMode === 'focus') {
      stats[today].focusTime += durations.focus;
      stats[today].cycles += 1;
      stats.streak = (stats.streak || 0) + 1;
    }
    
    localStorage.setItem('focusStats', JSON.stringify(stats));
    loadTodayStats();
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    // Play notification sound
    playNotificationSound();
    
    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('StudySync Timer', {
        body: timerMode === 'focus' 
          ? '🎉 Focus session complete! Time for a break.' 
          : '✨ Break over! Ready to focus again?',
        icon: '/favicon.ico'
      });
    }
    
    // Save stats if focus session
    if (timerMode === 'focus') {
      saveTodayStats();
      setSessions(s => s + 1);
    }
    
    // Auto-switch to next mode
    autoSwitchMode();
  };

  const autoSwitchMode = () => {
    if (timerMode === 'focus') {
      // After focus, go to break
      const nextMode = (sessions + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
      setTimerMode(nextMode);
      setTimeLeft(durations[nextMode] * 60);
    } else {
      // After break, go to focus
      setTimerMode('focus');
      setTimeLeft(durations.focus * 60);
    }
  };

  const handleStartPause = () => {
    if (!isRunning && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(durations[timerMode] * 60);
  };

  const handleModeChange = (mode) => {
    setIsRunning(false);
    setTimerMode(mode);
    setTimeLeft(durations[mode] * 60);
  };

  const playNotificationSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYHGGS37OihUBELTKXh8bllHAU2jdXzzn0vBSh+zPDajj4JFF2z6OyrVxQJQpzf8btvIwUsgs/y2Ik2Bxhks+zpoVARC0yl4fG5ZRwFNo3V885');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const getModeColor = () => {
    switch(timerMode) {
      case 'focus': return 'from-[#8AC6D1] to-[#A3BFFA]';
      case 'shortBreak': return 'from-[#FFD6A5] to-[#FF9A8B]';
      case 'longBreak': return 'from-[#DFF6F0] to-[#8AC6D1]';
      default: return 'from-[#8AC6D1] to-[#A3BFFA]';
    }
  };

  const getModeIcon = () => {
    switch(timerMode) {
      case 'focus': return <Brain className="text-white" size={24} />;
      case 'shortBreak': return <Coffee className="text-white" size={24} />;
      case 'longBreak': return <Zap className="text-white" size={24} />;
      default: return <Brain className="text-white" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#312e81] transition-colors duration-300 relative">
      {/* Focus Mode Overlay */}
      <AnimatePresence>
        {focusModeEnabled && (
          <FocusModeOverlay 
            timeLeft={timeLeft}
            timerMode={timerMode}
            onDisable={() => setFocusModeEnabled(false)}
          />
        )}
      </AnimatePresence>

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
                <Clock size={18} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Focus Timer</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Streak Badge */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#FFD6A5] to-[#FF9A8B] dark:from-[#ec4899] dark:to-[#8b5cf6] rounded-full">
                <Flame size={18} className="text-white" />
                <span className="text-sm font-bold text-white">{streak} day streak</span>
              </div>
              
              {/* Today's Focus Time */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-white/10 rounded-full">
                <Target size={18} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {todayFocusTime}m today
                </span>
              </div>
              
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
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Subject Selection */}
          <div className="lg:col-span-3">
            <SubjectSelector
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              selectedNote={selectedNote}
              setSelectedNote={setSelectedNote}
            />
          </div>

          {/* Center - Timer */}
          <div className="lg:col-span-6">
            <div className="bg-white dark:bg-[#1e1b4b] dark:border dark:border-white/10 rounded-2xl shadow-xl p-8">
              {/* Mode Selector */}
              <div className="flex gap-2 mb-8">
                {[
                  { mode: 'focus', label: 'Focus', icon: Brain },
                  { mode: 'shortBreak', label: 'Short Break', icon: Coffee },
                  { mode: 'longBreak', label: 'Long Break', icon: Zap }
                ].map(({ mode, label, icon: Icon }) => (
                  <button
                    key={mode}
                    onClick={() => handleModeChange(mode)}
                    disabled={isRunning}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                      timerMode === mode
                        ? `bg-gradient-to-r ${getModeColor()} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                    } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Icon size={18} />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>

              {/* Circular Timer */}
              <CircularTimer
                timeLeft={timeLeft}
                totalTime={durations[timerMode] * 60}
                isRunning={isRunning}
                timerMode={timerMode}
                getModeColor={getModeColor}
              />

              {/* Current Context */}
              {(selectedSubject || selectedNote) && (
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {selectedSubject && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#A3BFFA]/20 to-[#8AC6D1]/20 dark:from-[#3b82f6]/20 dark:to-[#ec4899]/20 rounded-full">
                      <BookOpen size={16} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{selectedSubject}</span>
                    </div>
                  )}
                  {selectedNote && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFD6A5]/20 to-[#FF9A8B]/20 dark:from-[#ec4899]/20 dark:to-[#8b5cf6]/20 rounded-full">
                      <Target size={16} className="text-[#FF9A8B] dark:text-[#ec4899]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{selectedNote}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Timer Controls */}
              <TimerControls
                isRunning={isRunning}
                onStartPause={handleStartPause}
                onReset={handleReset}
                timerMode={timerMode}
                focusModeEnabled={focusModeEnabled}
                setFocusModeEnabled={setFocusModeEnabled}
              />

              {/* Session Counter */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Session {sessions + 1} • {completedCycles} cycles completed today
                </p>
              </div>
            </div>

            {/* Break Suggestions (only show during breaks) */}
            {timerMode !== 'focus' && (
              <BreakSuggestions timerMode={timerMode} selectedNote={selectedNote} />
            )}
          </div>

          {/* Right Sidebar - Stats */}
          <div className="lg:col-span-3">
            <FocusStats
              todayFocusTime={todayFocusTime}
              completedCycles={completedCycles}
              streak={streak}
            />
          </div>
        </div>
      </div>
    </div>
  );
}