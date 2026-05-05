import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth?mode=login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTH API
// ============================================

export const authAPI = {
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/user/me');
    return response.data;
  },
};

// ============================================
// DASHBOARD API
// ============================================

export const dashboardAPI = {
  getStats: async () => {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return empty/zero data on error
      return {
        success: false,
        data: {
          activeGoals: 0,
          streak: 0,
          subjects: 0,
          progress: 0,
          todayStudyTime: 0,
          todayStudyHours: 0,
          todayStudyMinutes: 0,
          todayProgress: 0
        }
      };
    }
  },

  getHeatmap: async (days = 84) => {
    try {
      const response = await api.get(`/dashboard/heatmap?days=${days}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching heatmap:', error);
      return { success: false, data: [] };
    }
  },

  getPeakHours: async () => {
    try {
      const response = await api.get('/dashboard/peak-hours');
      return response.data;
    } catch (error) {
      console.error('Error fetching peak hours:', error);
      return { success: false, data: [] };
    }
  },

  getSubjectMastery: async () => {
    try {
      const response = await api.get('/dashboard/subject-mastery');
      return response.data;
    } catch (error) {
      console.error('Error fetching subject mastery:', error);
      return { success: false, data: [] };
    }
  },
};

// ============================================
// STUDY SESSIONS API
// ============================================

export const studySessionAPI = {
  create: async (sessionData) => {
    const response = await api.post('/study-sessions', sessionData);
    return response.data;
  },

  getAll: async (filters = {}) => {
    const response = await api.get('/study-sessions', { params: filters });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/study-sessions/${id}`);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/study-sessions/${id}`);
    return response.data;
  },
};

// ============================================
// GOALS API
// ============================================

export const goalsAPI = {
  create: async (goalData) => {
    const response = await api.post('/goals', goalData);
    return response.data;
  },

  getAll: async () => {
    try {
      const response = await api.get('/goals');
      return response.data;
    } catch (error) {
      console.error('Error fetching goals:', error);
      return { success: false, data: [] };
    }
  },

  getById: async (id) => {
    const response = await api.get(`/goals/${id}`);
    return response.data;
  },

  update: async (id, goalData) => {
    const response = await api.put(`/goals/${id}`, goalData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/goals/${id}`);
    return response.data;
  },

  toggleMilestone: async (goalId, milestoneId) => {
    const response = await api.patch(`/goals/${goalId}/milestones/${milestoneId}/toggle`);
    return response.data;
  },
};

// ============================================
// NOTES API
// ============================================

export const notesAPI = {
  create: async (noteData) => {
    const response = await api.post('/notes', noteData);
    return response.data;
  },

  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/notes', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      return { success: false, data: [] };
    }
  },

  getById: async (id) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  update: async (id, noteData) => {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },

  togglePin: async (id) => {
    const response = await api.patch(`/notes/${id}/pin`);
    return response.data;
  },
};

// ============================================
// ADMIN API
// ============================================

export const adminAPI = {
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },
};

export default api;