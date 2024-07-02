import { ReactElement, ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  keepMounted?: boolean;
}

export interface ModalContentProps {
  children?: ReactNode;
  open?: boolean;
}

export interface ModalTriggerProps {
  children: ReactElement;
  onClick?: () => void;
}
