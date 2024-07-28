import {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
  useState,
} from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, styled } from '@mui/material';
import MUIModal from '@mui/material/Modal';

import {
  ModalContentProps,
  ModalProps,
  ModalTriggerProps,
} from '../types/modal';

/**
 * keepMounted는 모달창을 항상 마운트시킵니다. 동일한 모달을 자주 발생시킬 시 성능을 높이기 위해 사용해주세요.
 */
export function Modal({ keepMounted = false, isOpen, children }: ModalProps) {
  const [open, setOpen] = useState(isOpen ? isOpen : false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const trigger = Children.map(children, (child) => {
    if (
      isValidElement<ModalTriggerProps>(child) &&
      child.type === ModalTrigger
    ) {
      return cloneElement(child, { onClick: handleOpen });
    }
    return child;
  });

  const content = Children.map(children, (child) => {
    if (
      isValidElement<ModalContentProps>(child) &&
      child.type === ModalContent
    ) {
      return cloneElement(child, { open });
    }
    return null;
  });

  return (
    <>
      {trigger}
      <MUIModal
        open={open}
        onClose={handleClose}
        keepMounted={keepMounted}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <ModalContainer>
          <Close onClick={handleClose} />
          {content}
        </ModalContainer>
      </MUIModal>
    </>
  );
}

export function ModalTrigger({ children, onClick }: ModalTriggerProps) {
  return cloneElement(children, { onClick: onClick });
}

export function ModalContent({ children, open }: ModalContentProps) {
  return open && children;
}

export function ModalHeader({ children }: { children: ReactNode }) {
  return <HeaderContainer>{children}</HeaderContainer>;
}

export function ModalTitle({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant='titleMedium'
      id='modal-modal-title'
      sx={{ fontWeight: 800, mb: 2 }}
    >
      {children}
    </Typography>
  );
}

export function ModalDescription({ children }: { children: ReactNode }) {
  return (
    <Typography variant='labelSmall' id='modal-modal-description'>
      {children}
    </Typography>
  );
}

const HeaderContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '8px',
  marginBottom: '16px',
});

const Close = styled(CloseIcon)({
  position: 'absolute',
  width: '1rem',
  height: '1rem',
  top: '16px',
  right: '16px',
  cursor: 'pointer',
});

const ModalContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 512,
  padding: 24,
  borderRadius: 8,
  [theme.breakpoints.down('sm')]: {
    minWidth: 320,
  },
}));
