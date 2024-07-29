import { User } from '@packages/components/types/user';
import { setAccessToken, setRefreshToken } from '@stores/token.store';
import { setUser, setUserState } from '@stores/user.store';
import { SignUpSchema } from 'src/types/sign-up.schema';
import { z } from 'zod';

import { api } from './axios-instance';
import { getGoogleInfo } from './user.service';

interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

const signIn = async (g_access_token: string | null | undefined) => {
  const data = await getGoogleInfo(g_access_token);
  const parts = data.name.split('|').map((part) => part.trim());
  const [name, department] = parts;

  setUser({
    email: data.email ? data.email : null,
    userAuthorization: null,
    name: name ? name : null,
    phoneNumber: null,
    department: department ? department : null,
    id: null,
  });

  const { user, access_token, refresh_token } = await api
    .get<SignInResponse>('/auth/sign-in', {
      params: {
        access_token: g_access_token,
      },
    })
    .then((res) => res.data);

  setUser(user);
  setAccessToken(access_token);
  setRefreshToken(refresh_token);
  setUserState('sign-in');
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
