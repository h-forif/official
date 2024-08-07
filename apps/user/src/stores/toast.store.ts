// useToastStore.ts
import { create } from 'zustand';

type ToastSeverity = 'success' | 'info' | 'warning' | 'error';
interface ToastState {
  message: string | null;
  severity: 'success' | 'info' | 'warning' | 'error' | null;
  showToast: ({
    message,
    severity,
  }: {
    message: string;
    severity: ToastSeverity;
  }) => void;
  clearToast: () => void;
}

const useToastStore = create<ToastState>((set) => ({
  message: null,
  severity: null,
  showToast: ({ message, severity }) => set({ message, severity }),
  clearToast: () => set({ message: null, severity: null }),
}));

export default useToastStore;
