import { create } from 'zustand';

interface DrawerStore {
  open: boolean;
  isClosing: boolean;
  setOpen: (open: boolean) => void;
  setIsClosing: (isClosing: boolean) => void;
}

export const drawerStore = create<DrawerStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  isClosing: false,
  setIsClosing: (isClosing) => set({ isClosing }),
}));

export const useDrawerStore = () => {
  return drawerStore((state) => state);
};
