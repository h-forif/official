import { AUTH_CONSTANT } from '@constants/auth.constant';
import { verifyAccessToken } from '@utils/verifyCredential';
import { useUserStore } from 'src/store/userStore';

import { getGoogleUserInfo, getUserInfo } from './user.service';

const handleSignIn = async ({ access_token }: TokenResponse) => {
  await verifyAccessToken(access_token);
  const googleUserInfo = await getGoogleUserInfo(access_token);
  if (googleUserInfo.hd !== AUTH_CONSTANT.EMAIL_DOMAIN)
    throw new Error('허용되지 않는 이메일입니다.');
  // 여기까지가 구글 로그인 인증! 밑에서부터 포리프 API와의 통신입니다.
  useUserStore.setState({ email: googleUserInfo.email });
  const userInfo = await getUserInfo();
  useUserStore.setState(userInfo);
};

export { handleSignIn };
