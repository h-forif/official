import { UserProfile } from '@packages/components/types/user';

import { authApi } from './axios-instance';

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
