import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const projectAPI = {
  createProject: (data) => api.post('/projects', data),
  getProjects: () => api.get('/projects'),
  getProjectById: (id) => api.get(`/projects/${id}`),
};

export default api;
