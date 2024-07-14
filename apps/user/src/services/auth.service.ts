import { verifyAccessToken } from '@utils/verifyCredential';
import { useUserStore } from 'src/store/userStore';

import { getGoogleUserInfo, getUserInfo } from './user.service';

const handleSignIn = async ({ access_token }: TokenResponse) => {
  // 아래부터 구글 로그인 시작!
  await verifyAccessToken(access_token);
  const googleUserInfo = await getGoogleUserInfo(access_token);
  // if (googleUserInfo.hd !== AUTH_CONSTANT.EMAIL_DOMAIN)
  //   throw new Error('허용되지 않는 이메일입니다.');
  useUserStore.setState({ email: googleUserInfo.email });
  console.log(googleUserInfo);
  // 아래부터 FORIF API 통신!
  const userInfo = await getUserInfo(googleUserInfo);
  console.log(userInfo);

  useUserStore.setState(userInfo);
};

export { handleSignIn };
