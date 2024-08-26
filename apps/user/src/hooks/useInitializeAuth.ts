import { useEffect } from 'react';

import { api } from '@services/axios-instance';
import {
  setAccessToken,
  useAccessToken,
  useRefreshToken,
} from '@stores/token.store';
import { setUserState } from '@stores/user.store';
import { useLocation, useNavigate } from '@tanstack/react-router';

const useInitializeAuth = () => {
  const refreshToken = useRefreshToken();
  const accessToken = useAccessToken();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      if (accessToken) {
        return;
      }
      if (refreshToken) {
        console.log(refreshToken);

        try {
          const { access_token } = await api
            .post('/auth/token', { refresh_token: refreshToken })
            .then((res) => res.data);
          setAccessToken(access_token);

          setUserState('sign-in');
        } catch (error) {
          console.error('Error refreshing access token:', error);
        }
      } else {
        if (
          location.pathname !== '/' &&
          location.pathname !== '/auth/sign-up' &&
          location.pathname.startsWith('/auth')
        ) {
          navigate({ to: '/' });
        }
        setUserState('sign-out');
      }
    };

    initializeAuth();
  }, [refreshToken, accessToken, location, navigate]);
};

export default useInitializeAuth;
