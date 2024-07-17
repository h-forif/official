import { useAccessToken } from '@store/token.store';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export const authApi = axios.create({
  baseURL: `${BASE_URL}/auth`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use((config) => {
  const accessToken = useAccessToken();
  // const refreshToken = localStorage.getItem('refreshToken');
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
});
