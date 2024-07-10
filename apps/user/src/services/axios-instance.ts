import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export const authApi = axios.create({
  baseURL: 'https://api.example.com/auth',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
