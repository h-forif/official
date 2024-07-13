import { User } from '@packages/components/types/user';
import axios from 'axios';

// 사용자 정보 관련 API 요청 함수 (예: 사용자 정보 조회, 사용자 업데이트 등)
const getGoogleUserInfo = async (accessToken: string): Promise<TokenInfo> => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

const getUserInfo = async () => {
  const body = JSON.stringify({
    username: 'emilys',
    password: 'emilyspass1',
  });
  const userInfo: User = await axios
    .post('https://dummyjson.com/auth/login', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
  return userInfo;
};

export { getGoogleUserInfo, getUserInfo };
