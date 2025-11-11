import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, BookOpen, Target, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-gray-100">
      {/* Navbar */}
      <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#ec4899] bg-clip-text text-transparent">
              StudySync
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Welcome, {user?.name}!</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-all"
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
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Target, label: 'Active Goals', value: '8', color: 'from-[#3b82f6]' },
            { icon: Calendar, label: 'Days Streak', value: '12', color: 'from-[#ec4899]' },
            { icon: BookOpen, label: 'Subjects', value: '5', color: 'from-[#8b5cf6]' },
            { icon: TrendingUp, label: 'Progress', value: '75%', color: 'from-[#22d3ee]' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} to-transparent rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/planner')}
          className="px-8 py-3 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all"
        >
          Go to Study Planner
        </button>
      </div>
    </div>
  );
}