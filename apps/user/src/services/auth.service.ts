import { User } from '@packages/components/types/user';
import { setAccessToken, setRefreshToken } from '@store/token.store';
import { setUser, setUserState } from '@store/user.store';
import axios from 'axios';
import { SignUpSchema } from 'src/types/sign-up.schema';
import { z } from 'zod';

import { api } from './axios-instance';

interface SignInResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

const signIn = async (g_access_token: string | null | undefined) => {
  try {
    // const { user, accessToken, refreshToken } = await api
    //   .post<SignInResponse>('/auth/sign-in', {
    //     g_access_token,
    //   })
    //   .then((res) => res.data);
    console.log(g_access_token);
    const { id, token, refreshToken, username, email }: SignInResponse =
      await axios
        .post('https://dummyjson.com/auth/login', {
          username: 'emilys',
          password: 'emilyspass',
          expiresInMins: 30, // optional, defaults to 60
        })
        .then((res) => res.data);
    setUser({
      id: id,
      name: username,
      email: email,
      state: 'sign-in',
      department: 'd',
      phoneNumber: '010-1234-5678',
      userAuthorization: '유저',
    });
    setUserState('sign-in');
    setAccessToken(token);
    setRefreshToken(refreshToken);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err);
    }
    // if (err.response?.status === 404) {
    //   throw new Error('UserNotFound');
    // }
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
