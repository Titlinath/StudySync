import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const mode = searchParams.get('mode');
    setIsLogin(mode === 'login');
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    // Simulate login (without backend for now)
    setTimeout(() => {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('user', JSON.stringify({ 
        name: formData.name || formData.email.split('@')[0], 
        email: formData.email 
      }));
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-[#8AC6D1]/20 to-transparent rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-[#A3BFFA]/20 to-transparent rounded-full blur-3xl" style={{ animation: 'float 10s ease-in-out infinite reverse' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8AC6D1] via-[#A3BFFA] to-[#FF9A8B] bg-clip-text text-transparent mb-2">
            StudySync
          </h1>
          <p className="text-gray-600">Your intelligent study companion</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {/* Tab Switcher */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8AC6D1] focus:ring-2 focus:ring-[#8AC6D1]/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8AC6D1] focus:ring-2 focus:ring-[#8AC6D1]/20 transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8AC6D1] focus:ring-2 focus:ring-[#8AC6D1]/20 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8AC6D1] focus:ring-2 focus:ring-[#8AC6D1]/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#FF9A8B] to-[#FFD6A5] text-white font-semibold rounded-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-600 hover:text-[#8AC6D1] transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
      `}</style>
    </div>
  );
}