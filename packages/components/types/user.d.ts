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
  myStudy: number | null; // 멘토로써 진행하고 있는 스터디
  currentStudyId: number | null; // 현재 내가 듣고 있는 스터디
  passedStudyId: number[] | null;
}