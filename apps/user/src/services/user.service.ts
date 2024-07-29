import { UserProfile } from '@packages/components/types/user';
import { Application } from 'src/types/apply.schema';

import { authApi } from './axios-instance';

const getUserInfo = async () => {
  const userInfo: UserProfile = await authApi
    .get('/auth/profile')
    .then((res) => res.data);
  return userInfo;
};

const getApplication = async () => {
  const application: Application = await authApi
    .get('/applies/application')
    .then((res) => res.data);
  return application;
};

export { getApplication, getUserInfo };
