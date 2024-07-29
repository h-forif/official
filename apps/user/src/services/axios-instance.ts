import {
  accessTokenStore,
  refreshTokenStore,
  setAccessToken,
} from '@stores/token.store';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

export const authApi = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

authApi.interceptors.request.use(async (config) => {
  const refreshToken = refreshTokenStore.getState().refreshToken;
  const accessToken = accessTokenStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = accessToken;
    return config;
  } else {
    try {
      const { access_token } = await api
        .post('/auth/token', { refresh_token: refreshToken })
        .then((res) => res.data);
      config.headers.Authorization = access_token;
      setAccessToken(access_token);
      return config;
    } catch (err) {
      // window.location.href = '/';
      console.error('An error occurred:', err);
      throw err;
    }
  }
});
