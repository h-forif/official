import type { User } from '@packages/components/types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserAction = {
  updateName: (name: User['name']) => void;
  updateDepartment: (department: User['department']) => void;
  updateState: (state: User['state']) => void;
};

const useUserStore = create(
  persist<User & UserAction>(
    (set) => ({
      name: null,
      id: null,
      department: null,
      auth_level: null,
      email: null,
      phone_number: null,
      state: null,
      updateName: (name) => set(() => ({ name })),
      updateDepartment: (department) => set(() => ({ department })),
      updateState: (state) => set(() => ({ state })),
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

const setUser = (user: User) => {
  useUserStore.setState(user);
};

const clearUser = () => {
  useUserStore.setState({
    name: null,
    id: null,
    department: null,
    auth_level: null,
    email: null,
    phone_number: null,
    state: 'sign-out',
  });
};

const getUser = () => {
  return useUserStore.getState();
};

const getUserState = () => {
  return useUserStore.getState().state;
};

const setUserState = (state: User['state']) => {
  useUserStore.setState({ state });
};

export {
  clearUser,
  getUser,
  getUserState,
  setUser,
  setUserState,
  useUserStore,
};
