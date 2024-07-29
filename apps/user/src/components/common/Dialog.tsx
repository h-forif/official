import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Typography,
} from '@mui/material';

import { Button } from '@packages/components/Button';
import { useDialogStore } from '@stores/dialog.store';

export const AlertDialog = () => {
  const { isOpen, dialogProps, closeDialog, isDualButton } = useDialogStore();
  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: {
          margin: 0,
          padding: '36px',
          xs: {
            width: '100%',
          },
          sm: {
            width: '560px',
          },
        },
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          alignItems: 'center',
          fontSize: '24px',
        }}
      >
        <Icon
          component={CheckRoundedIcon}
          color='primary'
          sx={{
            fontSize: '48px',
            borderRadius: '50%',
            border: '2px solid',
            mb: 2,
          }}
        />
        {dialogProps.title}
      </DialogTitle>

      {dialogProps.message && (
        <DialogContent sx={{ padding: 0 }}>
          <Typography variant='bodyMedium' textAlign={'center'} width={'100%'}>
            {dialogProps.message}
          </Typography>
        </DialogContent>
      )}

      <DialogActions
        sx={{
          marginTop: '36px',
          padding: 0,
        }}
      >
        {isDualButton && (
          <Button
            fullWidth
            variant='outlined'
            onClick={() => {
              closeDialog();
              dialogProps.subButtonAction?.();
            }}
          >
            {dialogProps.subButtonText}
          </Button>
        )}
        <Button
          fullWidth
          variant='contained'
          onClick={() => {
            closeDialog();
            dialogProps.mainButtonAction?.();
          }}
        >
          {dialogProps.mainButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
