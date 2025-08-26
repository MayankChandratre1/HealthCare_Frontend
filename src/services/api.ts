// web/src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://healthcare-backend-216484913698.europe-west1.run.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/api/auth/login', credentials),
  logout: () => api.post('/api/auth/logout'),
  getProfile: () => api.get('/api/auth/me')
};

export const patientsAPI = {
  getAll: () => api.get('/api/patients'),
  getById: (id: string) => api.get(`/api/patients/${id}`),
  create: (data: any) => api.post('/api/patients', data),
  update: (id: string, data: any) => api.put(`/api/patients/${id}`, data),
  delete: (id: string) => api.delete(`/api/patients/${id}`)
};

export const usersAPI = {
    getAll: () => api.get('/api/users'),
    getById: (id: string) => api.get(`/api/users/${id}`),
    create: (data: any) => api.post('/api/users', data),
    update: (id: string, data: any) => api.put(`/api/users/${id}`, data),
    delete: (id: string) => api.delete(`/api/users/${id}`)
}

export default api;
