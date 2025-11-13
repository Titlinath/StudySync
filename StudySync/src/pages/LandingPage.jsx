import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleAuthClick = (type) => {
    navigate(`/auth?mode=${type}`);
  };

  const handleFeatureClick = (featureType) => {
    const token = localStorage.getItem('token');
    
    if (featureType === 'planner') {
      if (token) {
        navigate('/planner');
      } else {
        navigate('/auth?mode=register');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#312e81] transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-white/10 backdrop-blur-lg shadow-lg dark:shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
          : 'bg-white/90 dark:bg-white/5 backdrop-blur-md'
      } ${scrolled ? 'dark:border-b dark:border-white/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#8AC6D1] via-[#A3BFFA] to-[#FF9A8B] dark:from-[#3b82f6] dark:via-[#ec4899] dark:to-[#8b5cf6] bg-clip-text text-transparent bg-[length:200%_200%]" style={{ animation: 'flow 6s linear infinite' }}>
                StudySync
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-700 dark:text-gray-300 hover:text-[#8AC6D1] dark:hover:text-[#3b82f6] font-medium transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 dark:text-gray-300 hover:text-[#8AC6D1] dark:hover:text-[#3b82f6] font-medium transition-colors"
              >
                About
              </button>
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              <button
                onClick={() => handleAuthClick('login')}
                className="px-6 py-2 border-2 border-[#8AC6D1] dark:border-[#3b82f6] text-[#8AC6D1] dark:text-[#3b82f6] rounded-full font-semibold hover:bg-[#8AC6D1] dark:hover:bg-[#3b82f6] hover:text-white dark:hover:text-white transition-all dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                Login
              </button>
              <button
                onClick={() => handleAuthClick('register')}
                className="px-6 py-2 bg-gradient-to-r from-[#FF9A8B] to-[#FFD6A5] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-full font-semibold hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} className="dark:text-gray-100" /> : <Menu size={24} className="dark:text-gray-100" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-white/10" style={{ animation: 'fadeIn 0.3s ease' }}>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => handleAuthClick('login')}
                  className="mx-4 px-6 py-2 border-2 border-[#8AC6D1] dark:border-[#3b82f6] text-[#8AC6D1] dark:text-[#3b82f6] rounded-full font-semibold text-center hover:bg-[#8AC6D1] dark:hover:bg-[#3b82f6] hover:text-white transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => handleAuthClick('register')}
                  className="mx-4 px-6 py-2 bg-gradient-to-r from-[#FF9A8B] to-[#FFD6A5] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-full font-semibold text-center hover:shadow-lg transition-all"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-[#8AC6D1]/20 dark:from-[#3b82f6]/20 to-transparent rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-[#A3BFFA]/20 dark:from-[#ec4899]/20 to-transparent rounded-full blur-3xl" style={{ animation: 'float 10s ease-in-out infinite reverse' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800 dark:text-gray-100">
                Plan. Track. <span className="bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:via-[#ec4899] dark:to-[#8b5cf6] bg-clip-text text-transparent">Grow.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Your intelligent study companion that helps you achieve academic excellence through smart planning, focused tracking, and motivated learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => handleAuthClick('register')}
                  className="px-8 py-3 bg-gradient-to-r from-[#FF9A8B] to-[#FFD6A5] dark:from-[#3b82f6] dark:to-[#ec4899] text-white rounded-full font-semibold hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all transform hover:-translate-y-1"
                >
                  Start Free Today
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="px-8 py-3 border-2 border-[#8AC6D1] dark:border-[#3b82f6] text-[#8AC6D1] dark:text-[#3b82f6] rounded-full font-semibold hover:bg-[#8AC6D1] dark:hover:bg-[#3b82f6] hover:text-white transition-all dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative">
              <div className="bg-white dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/10 rounded-2xl shadow-2xl dark:shadow-[0_0_50px_rgba(59,130,246,0.3)] p-6 transform hover:rotate-0 transition-all duration-300 dark:hover:shadow-[0_0_80px_rgba(236,72,153,0.4)]" style={{ transform: 'perspective(1000px) rotateY(-5deg)' }}>
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="bg-gradient-to-r from-[#A3BFFA] to-[#8AC6D1] dark:from-[#3b82f6] dark:to-[#ec4899] rounded-xl p-4 text-white mb-4 dark:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                  <h3 className="font-semibold mb-2">Today's Progress</h3>
                  <p className="text-sm opacity-90 mb-2">4 hours studied • 75% complete</p>
                  <div className="bg-white/30 dark:bg-white/20 h-2 rounded-full overflow-hidden dark:backdrop-blur-sm">
                    <div className="bg-white h-full rounded-full dark:shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ width: '75%', animation: 'fillProgress 2s ease forwards' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#E9F0FF] dark:bg-gradient-to-br dark:from-[#3b82f6]/20 dark:to-[#3b82f6]/10 dark:backdrop-blur-md dark:border dark:border-[#3b82f6]/30 rounded-lg p-4 text-center dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                    <div className="text-3xl font-bold text-[#8AC6D1] dark:text-[#3b82f6]">12</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Day Streak</div>
                  </div>
                  <div className="bg-[#FFE9D6] dark:bg-gradient-to-br dark:from-[#ec4899]/20 dark:to-[#ec4899]/10 dark:backdrop-blur-md dark:border dark:border-[#ec4899]/30 rounded-lg p-4 text-center dark:hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all">
                    <div className="text-3xl font-bold text-[#FF9A8B] dark:text-[#ec4899]">8</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Goals Done</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
<section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] dark:bg-[#0f172a] transition-colors">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
        <span className="dark:bg-gradient-to-r dark:from-[#3b82f6] dark:to-[#ec4899] dark:bg-clip-text dark:text-transparent">
          Everything You Need to Excel
        </span>
        <span className="dark:hidden">Everything You Need to Excel</span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">Powerful features designed for modern students</p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { 
          icon: '📚', 
          title: 'Smart Study Plans', 
          desc: 'AI-powered scheduling that adapts to your learning style and creates personalized study roadmaps.', 
          gradient: 'from-[#A3BFFA] to-[#8AC6D1]',
          darkGradient: 'dark:from-[#3b82f6]/30 dark:to-[#3b82f6]/10',
          clickable: true,
          action: 'planner'
        },
        { 
          icon: '✏️', 
          title: 'Organized Notes', 
          desc: 'Rich text editor with tagging, search, and PDF export. Keep all materials in one place.', 
          gradient: 'from-[#FF9A8B] to-[#FFD6A5]',
          darkGradient: 'dark:from-[#ec4899]/30 dark:to-[#ec4899]/10',
          clickable: false
        },
        { 
          icon: '⏰', 
          title: 'Focus Timers', 
          desc: 'Pomodoro technique with smart breaks. Custom alarms keep you on track without stress.', 
          gradient: 'from-[#DFF6F0] to-[#8AC6D1]',
          darkGradient: 'dark:from-[#8b5cf6]/30 dark:to-[#8b5cf6]/10',
          clickable: false
        },
        { 
          icon: '🎯', 
          title: 'Goal Tracking', 
          desc: 'Set milestones, track progress, and celebrate achievements. Build streaks and earn badges.', 
          gradient: 'from-[#E8DFF5] to-[#A3BFFA]',
          darkGradient: 'dark:from-[#22d3ee]/30 dark:to-[#22d3ee]/10',
          clickable: false
        },
        { 
          icon: '📊', 
          title: 'Visual Analytics', 
          desc: 'Understand your study patterns with beautiful charts. Discover your peak productivity times.', 
          gradient: 'from-[#A3BFFA] to-[#E9F0FF]',
          darkGradient: 'dark:from-[#3b82f6]/30 dark:to-[#3b82f6]/10',
          clickable: false
        },
        { 
          icon: '🌟', 
          title: 'Daily Motivation', 
          desc: 'Start each day inspired with quotes and connect with a supportive community of learners.', 
          gradient: 'from-[#FFD6A5] to-[#FF9A8B]',
          darkGradient: 'dark:from-[#ec4899]/30 dark:to-[#ec4899]/10',
          clickable: false
        }
      ].map((feature, idx) => (
        <div
          key={idx}
          onClick={() => feature.clickable && handleFeatureClick(feature.action)}
          className={`bg-white dark:bg-[#1e1b4b] dark:border dark:border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-xl dark:hover:bg-[#1e1b4b]/80 dark:hover:border-[#3b82f6]/50 dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-300 hover:-translate-y-2 group relative ${
            feature.clickable ? 'cursor-pointer' : ''
          }`}
        >
          <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} ${feature.darkGradient} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 dark:shadow-lg dark:group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all`}>
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white flex items-center justify-between">
            {feature.title}
            {feature.clickable && (
              <ArrowRight 
                size={20} 
                className="text-[#8AC6D1] dark:text-[#3b82f6] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" 
              />
            )}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.desc}</p>
          
          {feature.clickable && (
            <div className="mt-4 text-sm font-semibold text-[#8AC6D1] dark:text-[#3b82f6] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Try it now 
              <ArrowRight size={16} />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#A3BFFA] to-[#8AC6D1] dark:from-[#3b82f6] dark:via-[#ec4899] dark:to-[#8b5cf6] text-white transition-colors relative overflow-hidden">
        <div className="absolute inset-0 dark:opacity-10 opacity-0" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23fff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zm0-10c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Ready to Transform Your Study Routine?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            Join thousands of students achieving their academic goals with StudySync
          </p>
          <button
            onClick={() => handleAuthClick('register')}
            className="px-10 py-4 bg-white text-[#8AC6D1] dark:text-[#3b82f6] rounded-full font-bold text-lg hover:shadow-2xl dark:hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1 dark:hover:scale-105"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F2F2F] dark:bg-black/50 dark:backdrop-blur-lg dark:border-t dark:border-white/10 text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 StudySync. Empowering students worldwide.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fillProgress {
          from { width: 0; }
          to { width: 75%; }
        }
      `}</style>
    </div>
  );
}