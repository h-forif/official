import { User } from '@packages/components/types/user';

import { authApi } from './axios-instance';

const getUserInfo = async () => {
  const userInfo: User = await authApi.get('/profile').then((res) => res.data);
  return userInfo;
};

export { getUserInfo };
