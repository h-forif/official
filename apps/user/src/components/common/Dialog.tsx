import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Typography,
} from '@mui/material';

import { Button } from '@packages/components/Button';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';

export const AlertDialog = () => {
  const { isOpen, dialogProps, closeDialog, isDualButton } = useDialogStore();

  const renderIcon = (dialogIconType: DialogIconType) => {
    let IconComponent;
    switch (dialogIconType) {
      case DialogIconType.CONFIRM:
        IconComponent = (
          <Icon
            component={CheckRoundedIcon}
            color='primary'
            sx={{
              fontSize: '64px',
              borderRadius: '50%',
              border: '2px solid',
              mb: 2,
            }}
          />
        );
        break;
      case DialogIconType.WARNING:
        IconComponent = (
          <Icon
            component={PriorityHighIcon}
            color='error'
            sx={{
              fontSize: '64px',
              borderRadius: '50%',
              border: '2px solid',
              mb: 2,
            }}
          />
        );
        break;
      default:
        IconComponent = (
          <Icon
            component={CheckRoundedIcon}
            color='primary'
            sx={{
              fontSize: '64px',
              borderRadius: '50%',
              border: '2px solid',
              mb: 2,
            }}
          />
        );
        break;
    }
    return IconComponent;
  };

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: {
          margin: 0,
          padding: '36px',
          width: { xs: '100%', md: '512px' },
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
        {renderIcon(dialogProps.dialogIconType)}
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
