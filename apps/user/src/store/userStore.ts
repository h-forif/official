import type { User } from '@packages/components/types/user';
import { create } from 'zustand';

type UserAction = {
  updateName: (name: User['name']) => void;
  updateDepartment: (department: User['department']) => void;
};

const useUserStore = create<User & UserAction>((set) => ({
  name: '',
  user_id: 0,
  department: '정보시스템학과',
  auth_lv: 1,
  email: 'user@hanyang.ac.kr',
  phone_num: '010-0000-0000',
  updateName: (name) => set(() => ({ name: name })),
  updateDepartment: (department) => set(() => ({ department: department })),
}));

export { useUserStore };
