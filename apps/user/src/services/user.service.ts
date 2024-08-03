import { UserProfile } from '@packages/components/types/user';
import { SignUpSchema } from 'src/types/sign-up.schema';
import { z } from 'zod';

import { api, authApi } from './axios-instance';

/**
 * 유저 정보를 가져오는 함수입니다.
 * 액세스 토큰이 필요합니다.
 * @returns {Promise<UserProfile>} 유저 정보
 */
export const getUser = async (): Promise<UserProfile> => {
  const userInfo: UserProfile = await authApi
    .get('/auth/profile')
    .then((res) => res.data);

  return userInfo;
};

/**
 * 유저 정보를 업데이트합니다.
 * 액세스 토큰이 필요합니다.
 * @param updatedUserInfo 업데이트할 유저 정보 데이터. e.g. { phone_number: '01012345678' }
 */
export interface UpdateUser
  extends Omit<z.infer<typeof SignUpSchema>, 'privacyPolicyAccepted'> {
  img_url: string;
}
export const updateUser = async (formData: UpdateUser) => {
  await authApi.patch('/auth/profile', formData);
};

/**
 * 구글 정보를 가져오는 함수입니다.
 * 구글 로그인을 통해 받은 액세스 토큰이 필요합니다. 회원가입 시 유저가 정보를 입력하지 않아도 되도록 도와줍니다.
 * @param {string | null | undefined} g_access_token 구글 액세스 토큰
 * @returns {Promise<{ email: string; name: string }>} 구글 정보
 */
export const getGoogleInfo = async (
  g_access_token: string | null | undefined,
): Promise<{ email: string; name: string }> => {
  const data: { email: string; name: string } = await api
    .get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${g_access_token}`,
      },
    })
    .then((res) => res.data);
  return data;
};
