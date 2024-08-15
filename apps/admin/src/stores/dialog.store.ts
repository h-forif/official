import { create } from 'zustand';

export enum DialogIconType {
  'WARNING',
  'CONFIRM',
  'DELETE',
  'MESSAGE',
}

export interface SingleButtonDialogProps {
  dialogIconType: DialogIconType;
  title: string;
  message?: string;
  mainButtonText?: string;
  mainButtonAction?: (() => void) | null;
  onClose?: (() => void) | null;
}

export interface DialogProps extends SingleButtonDialogProps {
  subButtonText?: string;
  subButtonAction?: (() => void) | null;
}

interface DialogState {
  isOpen: boolean;
  isDualButton: boolean;
  dialogProps: DialogProps;
  openSingleButtonDialog: (dialogProps: SingleButtonDialogProps) => void;
  openDualButtonDialog: (dialogProps: DialogProps) => void;
  closeDialog: () => void;
}

const initialDialogProps: DialogProps = {
  dialogIconType: DialogIconType.MESSAGE,
  title: '',
  message: '',
  mainButtonText: '',
  mainButtonAction: null,
  subButtonText: '',
  subButtonAction: null,
  onClose: null,
};

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  isDualButton: false,
  dialogProps: initialDialogProps,

  openSingleButtonDialog: (dialogProps: SingleButtonDialogProps) =>
    set(() => ({
      isOpen: true,
      isDualButton: false,
      dialogProps: { ...initialDialogProps, ...dialogProps },
    })),

  openDualButtonDialog: (dialogProps: DialogProps) =>
    set(() => ({
      isOpen: true,
      isDualButton: true,
      dialogProps,
    })),

  closeDialog: () =>
    set((state) => {
      state.dialogProps.onClose?.();
      return { isOpen: false };
    }),
}));
