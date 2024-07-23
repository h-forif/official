import { useCallback, useState } from 'react';

import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

type ToastSeverity = 'success' | 'info' | 'warning' | 'error';

interface ToastOptions {
  severity: ToastSeverity;
  message: string;
}

export function useToast() {
  const [open, setOpen] = useState(false);
  const [toastOptions, setToastOptions] = useState<ToastOptions | null>(null);

  const showToast = useCallback((options: ToastOptions) => {
    setToastOptions(options);
    setOpen(true);
  }, []);

  const handleClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    },
    [],
  );

  return {
    showToast,
    ToastComponent: toastOptions ? (
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toastOptions.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {toastOptions.message}
        </Alert>
      </Snackbar>
    ) : null,
  };
}
