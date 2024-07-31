import { UserProfile } from '@packages/components/types/user';
import { Application } from 'src/types/apply.schema';

import { api, authApi } from './axios-instance';

const getUserInfo = async () => {
  const userInfo: UserProfile = await authApi
    .get('/auth/profile')
    .then((res) => res.data);
  console.log(userInfo);

  return userInfo;
};

const getGoogleInfo = async (g_access_token: string | null | undefined) => {
  const data: { email: string; name: string } = await api
    .get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${g_access_token}`,
      },
    })
    .then((res) => res.data);
  return data;
};

const getApplication = async () => {
  const application: Application = await authApi
    .get('/applies/application')
    .then((res) => res.data);
  return application;
};

export { getApplication, getGoogleInfo, getUserInfo };
