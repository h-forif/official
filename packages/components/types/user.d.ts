export interface User {
  userAuthorization: '관리자' | '유저' | '운영진' | '';
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
  id: number;
}
