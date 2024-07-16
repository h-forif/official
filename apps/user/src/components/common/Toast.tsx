// Toast.tsx
import { useCallback } from 'react';

import { Alert, Snackbar } from '@mui/material';

import useToastStore from '@store/toast.store';

const Toast = () => {
  const { message, severity, clearToast } = useToastStore();

  const handleClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      clearToast();
    },
    [clearToast],
  );

  return (
    <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
      {message && severity ? (
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
};

export default Toast;
