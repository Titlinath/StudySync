import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-gray-100">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'bg-white/5 backdrop-blur-md'
      } border-b border-white/10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#3b82f6] via-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent bg-[length:200%_200%] animate-[flow_6s_linear_infinite]">
                StudySync
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-300 hover:text-[#3b82f6] font-medium transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-[#3b82f6] font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleAuthClick('login')}
                className="px-6 py-2 border-2 border-[#3b82f6] text-[#3b82f6] rounded-full font-semibold hover:bg-[#3b82f6] hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
              >
                Login
              </button>
              <button
                onClick={() => handleAuthClick('register')}
                className="px-6 py-2 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white rounded-full font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 animate-[fadeIn_0.3s_ease]">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-left px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => handleAuthClick('login')}
                  className="mx-4 px-6 py-2 border-2 border-[#3b82f6] text-[#3b82f6] rounded-full font-semibold text-center hover:bg-[#3b82f6] hover:text-white transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => handleAuthClick('register')}
                  className="mx-4 px-6 py-2 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white rounded-full font-semibold text-center hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all"
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
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3b82f6] opacity-20 rounded-full blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ec4899] opacity-20 rounded-full blur-[120px] animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#8b5cf6] opacity-15 rounded-full blur-[100px] animate-[pulse_4s_ease-in-out_infinite]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Plan. Track. <span className="bg-gradient-to-r from-[#3b82f6] via-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent">Grow.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Your intelligent study companion that helps you achieve academic excellence through smart planning, focused tracking, and motivated learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => handleAuthClick('register')}
                  className="px-8 py-3 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white rounded-full font-semibold hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all transform hover:-translate-y-1"
                >
                  Start Free Today
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="px-8 py-3 border-2 border-[#3b82f6] text-[#3b82f6] rounded-full font-semibold hover:bg-[#3b82f6] hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.3)] p-6 transform hover:rotate-0 transition-all duration-500 hover:shadow-[0_0_80px_rgba(236,72,153,0.4)]" style={{ transform: 'perspective(1000px) rotateY(-5deg)' }}>
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-xl p-4 text-white mb-4 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                  <h3 className="font-semibold mb-2">Today's Progress</h3>
                  <p className="text-sm opacity-90 mb-2">4 hours studied • 75% complete</p>
                  <div className="bg-white/20 h-2 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="bg-white h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ width: '75%', animation: 'fillProgress 2s ease forwards' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/10 backdrop-blur-md border border-[#3b82f6]/30 rounded-lg p-4 text-center hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                    <div className="text-3xl font-bold text-[#3b82f6]">12</div>
                    <div className="text-sm text-gray-300">Day Streak</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#ec4899]/20 to-[#ec4899]/10 backdrop-blur-md border border-[#ec4899]/30 rounded-lg p-4 text-center hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all">
                    <div className="text-3xl font-bold text-[#ec4899]">8</div>
                    <div className="text-sm text-gray-300">Goals Done</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] bg-clip-text text-transparent">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-gray-300">Powerful features designed for modern students</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '📚', title: 'Smart Study Plans', desc: 'AI-powered scheduling that adapts to your learning style and creates personalized study roadmaps.', color: 'from-[#3b82f6]' },
              { icon: '✏️', title: 'Organized Notes', desc: 'Rich text editor with tagging, search, and PDF export. Keep all materials in one place.', color: 'from-[#ec4899]' },
              { icon: '⏰', title: 'Focus Timers', desc: 'Pomodoro technique with smart breaks. Custom alarms keep you on track without stress.', color: 'from-[#8b5cf6]' },
              { icon: '🎯', title: 'Goal Tracking', desc: 'Set milestones, track progress, and celebrate achievements. Build streaks and earn badges.', color: 'from-[#22d3ee]' },
              { icon: '📊', title: 'Visual Analytics', desc: 'Understand your study patterns with beautiful charts. Discover your peak productivity times.', color: 'from-[#3b82f6]' },
              { icon: '🌟', title: 'Daily Motivation', desc: 'Start each day inspired with quotes and connect with a supportive community of learners.', color: 'from-[#ec4899]' }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} to-transparent rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-100">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#3b82f6] via-[#ec4899] to-[#8b5cf6] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23fff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zm0-10c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Ready to Transform Your Study Routine?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            Join thousands of students achieving their academic goals with StudySync
          </p>
          <button
            onClick={() => handleAuthClick('register')}
            className="px-10 py-4 bg-white text-[#3b82f6] rounded-full font-bold text-lg hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1 hover:scale-105"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-lg border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
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