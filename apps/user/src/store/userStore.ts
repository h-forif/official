import type { User } from '@packages/components/types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserAction = {
  updateName: (name: User['name']) => void;
  updateDepartment: (department: User['department']) => void;
};

const useUserStore = create(
  persist<User & UserAction>(
    (set) => ({
      name: '',
      id: 0,
      department: '',
      userAuthorization: '',
      email: '',
      phoneNumber: '',
      updateName: (name) => set(() => ({ name: name })),
      updateDepartment: (department) => set(() => ({ department: department })),
    }),
    {
      name: 'userinfo', // 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => sessionStorage), // 사용할 스토리지 지정
    },
  ),
);

export { useUserStore };
