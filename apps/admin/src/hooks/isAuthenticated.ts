import { getUser } from '@stores/user.store';

export const isAuthenticated = () => {
  const user = getUser();
  return user && user.id !== null;
};
