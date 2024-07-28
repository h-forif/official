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
  // const application: Application = await authApi
  //   .get('/apply')
  //   .then((res) => res.data);
  const application: Application = {
    primaryStudy: '2',
    primaryIntro:
      '저는 python 정복하기 스터디에 들어오고 싶은 이유는 파이썬이 현재 많은 분야에서 활용되고 있고, 제가 프로그래밍 언어를 배우고 싶어하는 동기가 크기 때문입니다.',
    secondaryStudy: '4',
    secondaryIntro: '롤 백 골 백은 정말 훌륭한 스터디입니다.',
    isPrimaryStudyOnly: false,
  };
  return application;
};

export { getApplication, getUserInfo };
