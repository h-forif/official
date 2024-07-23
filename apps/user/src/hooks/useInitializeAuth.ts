import { useEffect } from 'react';

import {
  setAccessToken,
  useAccessToken,
  useRefreshToken,
} from '@store/token.store';
import { setUserState } from '@store/user.store';
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
          // 여기서 필요한 경우 로그아웃 처리를 할 수 있습니다.
        }
      }
    };

    initializeAuth();
  }, [refreshToken, accessToken]);
};

export default useInitializeAuth;
