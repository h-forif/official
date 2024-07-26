import { UserProfile } from '@packages/components/types/user';

import { authApi } from './axios-instance';

const getUserInfo = async () => {
  const userInfo: UserProfile = await authApi
    .get('/auth/profile')
    .then((res) => res.data);
  return userInfo;
};

export { getUserInfo };
