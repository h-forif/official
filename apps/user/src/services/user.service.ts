import { User } from '@packages/components/types/user';
import axios from 'axios';

import { api } from './axios-instance';

// 사용자 정보 관련 API 요청 함수 (예: 사용자 정보 조회, 사용자 업데이트 등)
const getGoogleUserInfo = async (oauth_token: string): Promise<TokenInfo> => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${oauth_token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

const getUserInfo = async (accessToken: string) => {
  const userInfo: User = await api
    .post(
      '/auth/sign-in',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      },
    )
    .then((res) => res.data);
  return userInfo;
};

export { getGoogleUserInfo, getUserInfo };
