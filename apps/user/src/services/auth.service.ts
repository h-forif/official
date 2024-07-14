import { User } from '@packages/components/types/user';
import { createJwt } from '@utils/createJwt';
import { parseGoogleUserName } from '@utils/parseGoogleUserName';
import { verifyAccessToken } from '@utils/verifyCredential';
import axios from 'axios';
import { useUserStore } from 'src/store/userStore';
import { SignUpSchema } from 'src/types/sign-up.schema';
import { z } from 'zod';

import { api } from './axios-instance';
import { getGoogleUserInfo, getUserInfo } from './user.service';

const handleSignIn = async (oauth_token: string) => {
  try {
    // 아래부터 구글 로그인 시작!
    await verifyAccessToken(oauth_token);
    const googleUserInfo = await getGoogleUserInfo(oauth_token);
    // if (googleUserInfo.hd !== AUTH_CONSTANT.EMAIL_DOMAIN)
    //   throw new Error('허용되지 않는 이메일입니다.');
    const { name, department } = parseGoogleUserName(googleUserInfo);

    useUserStore.setState({ email: googleUserInfo.email, name, department });
    // 아래부터 FORIF API 통신!
    const accessToken = await createJwt(googleUserInfo);
    const userInfo = await getUserInfo(accessToken);

    useUserStore.setState(userInfo);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      throw new Error('UserNotFound'); // 사용자 정보를 찾을 수 없음을 나타내는 에러를 던짐
    } else {
      console.error('An error occurred:', error);
      throw error;
    }
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

export { handleSignIn, handleSignUp };
