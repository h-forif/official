import { User } from '@packages/components/types/user';
import { setAccessToken, setRefreshToken } from '@store/token.store';
import { setUser } from '@store/user.store';
import axios from 'axios';
import { SignUpSchema } from 'src/types/sign-up.schema';
import { z } from 'zod';

import { api } from './axios-instance';

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
// TO-DO: replace to error handling
const SignInResponseExample: SignInResponse = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIyMDIzMDYzODQ1IiwiaWF0IjoxNzIxMjM5MDIyLCJleHAiOjE3MjEzMzkwMjJ9.66y82lXK0lFtaOjd7IRbDtAa12UcOFo3kh9HIg80T4A',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIyMDIzMDYzODQ1IiwiaWF0IjoxNzIxMjM5MDIyLCJleHAiOjE3MjEzMzkwMjJ9.66y82lXK0lFtaOjd7IRbDtAa12UcOFo3kh9HIg80T4A',
  user: {
    id: 2023063845,
    name: '양병현',
    email: 'zxvm5962@hanyang.ac.kr',
    department: '컴퓨터공학과',
    phoneNumber: '010-1234-5678',
    userAuthorization: '관리자',
  },
};

const signIn = async (g_access_token: string | null | undefined) => {
  try {
    const { user, accessToken, refreshToken } = await api
      .post<SignInResponse>('/auth/sign-in', {
        g_access_token,
      })
      .then((res) => res.data);
    setUser(user);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      //TO-DO: 다 지워야 함.
      const { user, accessToken, refreshToken } = SignInResponseExample;
      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
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
