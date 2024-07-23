import { User } from '@packages/components/types/user';
import { setAccessToken, setRefreshToken } from '@store/token.store';
import { setUser, setUserState } from '@store/user.store';
import axios from 'axios';
import { SignUpSchema } from 'src/types/sign-up.schema';
import { z } from 'zod';

import { api } from './axios-instance';

interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

const signIn = async (g_access_token: string | null | undefined) => {
  console.log(g_access_token);

  try {
    const { user, access_token, refresh_token } = await api
      .get<SignInResponse>('/auth/sign-in', {
        params: {
          access_token: g_access_token,
        },
      })
      .then((res) => res.data);

    setUser(user);
    setUserState('sign-in');
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      throw new Error('UserNotFound');
    }
    throw err;
  }
};

const handleSignUp = async (
  { department, id, name, phoneNumber }: z.infer<typeof SignUpSchema>,
  accessToken: string | null | undefined,
) => {
  try {
    const data: User = await api
      .post(
        '/signup',
        {
          userName: name,
          department: department,
          id: id,
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
        },
      )
      .then((res) => res.data);
    return data;
  } catch (err) {
    console.error('An error occurred:', err);
    throw new Error('회원가입에 실패했습니다.');
  }
};

export { handleSignUp, signIn };
