import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

export const authApi = axios.create({
  baseURL: 'https://api.example.com/auth',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});
