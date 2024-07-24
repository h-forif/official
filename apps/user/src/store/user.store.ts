import type { User } from '@packages/components/types/user';
import { create } from 'zustand';

type UserAction = {
  updateName: (name: User['name']) => void;
  updateDepartment: (department: User['department']) => void;
  updateState: (state: User['state']) => void;
};

const useUserStore = create<User & UserAction>((set) => ({
  name: null,
  id: null,
  department: null,
  userAuthorization: null,
  email: null,
  phoneNumber: null,
  state: 'sign-out',
  updateName: (name) => set(() => ({ name: name })),
  updateDepartment: (department) => set(() => ({ department: department })),
  updateState: (state) => set(() => ({ state: state })),
}));

const setUser = (user: User) => {
  useUserStore.setState(user);
};

const clearUser = () => {
  useUserStore.setState({
    name: null,
    id: null,
    department: null,
    userAuthorization: null,
    email: null,
    phoneNumber: null,
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