import { api } from '@services/axios-instance';
import {
  accessTokenStore,
  refreshTokenStore,
  setAccessToken,
} from '@stores/token.store';

const getIsAuthenticated = async () => {
  const refreshToken = refreshTokenStore.getState().refreshToken;
  const accessToken = accessTokenStore.getState().accessToken;
  if (accessToken) {
    return false;
  }
  if (refreshToken) {
    const { access_token } = await api
      .post('/auth/token', { refresh_token: refreshToken })
      .then((res) => res.data);
    setAccessToken(access_token);
    return true;
  }
  return false;
};

export default getIsAuthenticated;
