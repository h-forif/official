import { User } from '@packages/components/types/user';
import { setAccessToken, setRefreshToken } from '@stores/token.store';
import { setUser, setUserState } from '@stores/user.store';

import { api } from './axios-instance';

interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

const signIn = async (g_access_token: string | null | undefined) => {
  const { user, access_token, refresh_token } = await api
    .get<SignInResponse>('/auth/sign-in', {
      params: {
        access_token: g_access_token,
      },
    })
    .then((res) => res.data);

  if (user.auth_level === 1) throw new Error('허용되지 않은 계정입니다.');
  setUser(user);
  setAccessToken(access_token);
  setRefreshToken(refresh_token);
  setUserState('sign-in');

  return {
    data: user,
    error: null,
  };
};

export { signIn };
