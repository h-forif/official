import { User } from '@packages/components/types/user';
import { setAccessToken, setRefreshToken } from '@stores/token.store';
import { setUser, setUserState } from '@stores/user.store';
import axios from 'axios';
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

  console.log('Here1');
  console.log(data);
  if (!data.email.endsWith('@hanyang.ac.kr')) {
    return {
      data: null,
      error: {
        title: '허가되지 않은 이메일주소',
        message: '한양대학교 이메일(@hanyang.ac.kr)로 로그인해주세요.',
        status: 401,
      },
    };
  }

  setUser({
    email: data.email ? data.email : null,
    auth_level: null,
    name: name ? name : null,
    phone_number: null,
    department: department ? department : null,
    id: null,
  });

  try {
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

    return {
      data: user,
      error: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return {
        access_token: g_access_token,
        error: {
          status: 404,
        },
      };
    } else {
      return {
        data: null,
        error: {
          title: '로그인 오류',
          message: '로그인에 실패했습니다. 다시 시도해주세요.',
          status: 500,
        },
      };
    }
  }
};

const handleSignUp = async (
  { department, id, name, phone_number }: z.infer<typeof SignUpSchema>,
  accessToken: string | null | undefined,
) => {
  const data: User = await api
    .post(
      '/auth/sign-up',
      {
        name: name,
        department: department,
        id: id,
        phone_number: phone_number,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          charset: 'utf-8',
          Authorization: `${accessToken}`,
        },
      },
    )
    .then((res) => res.data);
  return data;
};

export { handleSignUp, signIn };
