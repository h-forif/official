import { useEffect } from 'react';

import {
  setAccessToken,
  useAccessToken,
  useRefreshToken,
} from '@stores/token.store';
import { setUserState } from '@stores/user.store';
import { api } from 'src/services/axios-instance';

const useInitializeAuth = () => {
  const refreshToken = useRefreshToken();
  const accessToken = useAccessToken();

  useEffect(() => {
    const initializeAuth = async () => {
      if (accessToken) {
        return;
      }
      if (refreshToken) {
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
        setUserState('sign-out');
      }
    };

    initializeAuth();
  }, [refreshToken, accessToken]);
};

export default useInitializeAuth;
