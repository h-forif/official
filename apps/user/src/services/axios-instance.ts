import {
  accessTokenStore,
  refreshTokenStore,
  setAccessToken,
} from '@store/token.store';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export const authApi = axios.create({
  baseURL: `${BASE_URL}/auth`,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

authApi.interceptors.request.use(async (config) => {
  const refreshToken = refreshTokenStore.getState().refreshToken;
  const accessToken = accessTokenStore.getState().accessToken;

  if (accessToken) {
    return config;
  } else {
    try {
      const accessToken = await api
        .post('/auth/refresh', { refreshToken })
        .then((res) => res.data);
      console.log(accessToken);

      config.headers.Authorization = accessToken;
      setAccessToken(accessToken);
      return config;
    } catch (err) {
      // window.location.href = '/';
      console.error('An error occurred:', err);
      throw err;
    }
  }
});
