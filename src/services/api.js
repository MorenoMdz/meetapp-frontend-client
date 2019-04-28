import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  // baseURL: 'https://madz.tech',
  // baseURL: 'https://134.209.63.4',
  // baseURL: 'http://localhost:3333/',
  baseURL: 'https://meetapp-morenomdz.herokuapp.com/',
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
