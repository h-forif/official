import type { User } from '@packages/components/types/user';
import { create } from 'zustand';

type UserAction = {
  updateName: (name: User['name']) => void;
  updateDepartment: (department: User['department']) => void;
};

const useUserStore = create<User & UserAction>((set) => ({
  name: '',
  id: 0,
  department: '',
  userAuthorization: '',
  email: '',
  phoneNumber: '',
  updateName: (name) => set(() => ({ name: name })),
  updateDepartment: (department) => set(() => ({ department: department })),
}));

const setUser = (user: User) => {
  useUserStore.setState(user);
};

const getUser = () => {
  return useUserStore.getState();
};

export { getUser, setUser, useUserStore };
