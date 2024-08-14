export interface User {
  auth_level: number | null;
  name: string | null;
  email: string | null;
  phone_number: string | null;
  department: string | null;
  id: string | null;
  state?: 'sign-in' | 'sign-out' | null;
}

export interface UserProfile
  extends Pick<User, Exclude<keyof User, 'state' | 'auth_level'>> {
  img_url: string | null;
  current_study_id: number | null; // 현재 내가 듣고 있는 스터디
  passed_study_id: number[] | null;
}
