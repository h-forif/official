import { getUser } from '@stores/user.store';

export const isAuthenticated = () => {
  const user = getUser();
  return user && user.id !== null; // 유저 정보가 존재하고, id가 null이 아니면 인증된 것으로 간주
};
