import { ReactElement, ReactNode, Ref, forwardRef } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  AppBar,
  Box,
  BoxProps,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { GridRowId } from '@mui/x-data-grid';

import { Button } from '@packages/components/Button';
import { Application, acceptStudies } from '@services/admin.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AcceptDialog({
  studyId,
  user_id,
  application,
  open,
  handleClose,
}: {
  studyId: number;
  user_id: number | undefined;
  application: Application | null;
  open: boolean;
  handleClose: () => void;
}) {
  const { openSingleButtonDialog, openDualButtonDialog, closeDialog } =
    useDialogStore();

  const handleAccept = async (user_id: GridRowId) => {
    openDualButtonDialog({
      title: '멘티 승인',
      message: '해당 멘티를 승인할까요? 이 결정은 취소할 수 없습니다.',
      mainButtonText: '승인',
      dialogIconType: DialogIconType.CONFIRM,
      mainButtonAction: async () => {
        try {
          await acceptStudies([Number(user_id)], studyId);
          closeDialog();
          openSingleButtonDialog({
            title: `해당 멘티가 승인되었습니다.`,
            message: `해당 멘티(${application?.user_id} ${application?.name})가 승인되었습니다. "내 스터디 관리"에서 해당 멘티가 성공적으로 추가되었는지 확인해주세요.`,
            mainButtonText: '확인',
            dialogIconType: DialogIconType.CONFIRM,
          });
        } catch (e) {
          console.error(`Failed to approve member with ID ${user_id}:`, e);
        }
      },
      subButtonText: '취소',
    });
  };

  if (!application) {
    return null;
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          backgroundColor: 'background.default',
        },
      }}
    >
      <AppBar sx={{ position: 'sticky' }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant='titleMedium'
            component='div'
          >
            {application.user_id} {application.name}
          </Typography>
          <Button
            autoFocus
            color='inherit'
            onClick={() => handleAccept(user_id!)}
          >
            승낙
          </Button>
        </Toolbar>
      </AppBar>
      <Layout width={'100%'}>
        <Title
          title='멘티 승낙'
          label='아래 스터디 정보에서 부족하거나 수정해야할 부분이 있는지 확인해주세요. 확인이 끝났다면 오른쪽 위 승인 버튼을 클릭하여 승인 절차를 진행해주세요.'
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <BorderBox>
              <Typography variant='bodySmall' mb={2}>
                이름
              </Typography>
              <Typography variant='bodyLarge'>{application.name}</Typography>
            </BorderBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <BorderBox>
              <Typography variant='bodySmall' mb={2}>
                학번
              </Typography>
              <Typography variant='bodyLarge'>{application.user_id}</Typography>
            </BorderBox>
          </Grid>
          <Grid item xs={12}>
            <BorderBox>
              <Typography variant='bodySmall' mb={2}>
                한 줄 소개
              </Typography>
              <Typography variant='bodyLarge'>{application.intro}</Typography>
            </BorderBox>
          </Grid>
        </Grid>
      </Layout>
    </Dialog>
  );
}

function BorderBox({
  children,
  props,
}: {
  children: ReactNode;
  props?: BoxProps;
}) {
  return (
    <Box
      border={1}
      borderColor={'divider'}
      p={3}
      width={'100%'}
      borderRadius={2}
      minHeight={120}
      {...props}
    >
      {children}
    </Box>
  );
}
