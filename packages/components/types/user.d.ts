export interface User {
  userAuthorization: '관리자' | '유저' | '운영진' | null;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  department: string | null;
  id: string | null;
  state?: 'sign-in' | 'sign-out' | 'loading';
}

export interface UserProfile
  extends Pick<User, Exclude<keyof User, 'state' | 'userAuthorization'>> {
  image: string | null;
}
