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
    <div className="min-h-screen bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0]">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] bg-clip-text text-transparent">
              StudySync
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {user?.name}!</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition-all"
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
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Target, label: 'Active Goals', value: '8', gradient: 'from-[#8AC6D1] to-[#A3BFFA]' },
            { icon: Calendar, label: 'Days Streak', value: '12', gradient: 'from-[#FF9A8B] to-[#FFD6A5]' },
            { icon: BookOpen, label: 'Subjects', value: '5', gradient: 'from-[#DFF6F0] to-[#8AC6D1]' },
            { icon: TrendingUp, label: 'Progress', value: '75%', gradient: 'from-[#E8DFF5] to-[#A3BFFA]' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/planner')}
          className="px-8 py-3 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Go to Study Planner
        </button>
      </div>
    </div>
  );
}