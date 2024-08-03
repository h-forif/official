// useToastStore.ts
import { create } from 'zustand';

interface ToastState {
  message: string | null;
  severity: 'success' | 'info' | 'warning' | 'error' | null;
  showToast: (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => void;
  clearToast: () => void;
}

const useToastStore = create<ToastState>((set) => ({
  message: null,
  severity: null,
  showToast: (message, severity) => set({ message, severity }),
  clearToast: () => set({ message: null, severity: null }),
}));

export default useToastStore;
