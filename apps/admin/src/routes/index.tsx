import { useRef } from 'react';

import GoogleIcon from '@mui/icons-material/Google';
import { Stack, Typography } from '@mui/material';

import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { useGoogleLogin } from '@react-oauth/google';
import { signIn } from '@services/auth.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion, useDragControls } from 'framer-motion';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const controls = useDragControls();
  const navigate = useNavigate();
  const { openSingleButtonDialog } = useDialogStore();
  const constraintsRef = useRef(null);
  const handleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await signIn(tokenResponse.access_token);
      if (res.error) {
        openSingleButtonDialog({
          title: res.error,
          message: '멘토나 운영진이라면 SW팀 혹은 회장단에게 문의해주세요.',
          dialogIconType: DialogIconType.WARNING,
          mainButtonText: '확인',
        });
        return;
      }
      navigate({ to: '/dashboard' });
    },
  });

  return (
    <Stack direction={'row'} height={'100vh'}>
      <Stack
        width={'50%'}
        height={'100%'}
        sx={{
          backgroundColor: 'primary.dark',
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <motion.div
          ref={constraintsRef}
          style={{ width: '100%', height: '100%' }}
        >
          <motion.div
            drag
            dragControls={controls}
            dragConstraints={constraintsRef}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          <motion.div
            drag
            dragControls={controls}
            dragConstraints={constraintsRef}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          <motion.div
            drag
            dragControls={controls}
            dragConstraints={constraintsRef}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          <motion.div
            drag
            dragControls={controls}
            dragConstraints={constraintsRef}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
        </motion.div>
      </Stack>
      <CenteredBox p={5} textAlign={'center'} flexGrow={1} height={'100%'}>
        <Stack gap={2} width={'100%'}>
          <Typography variant={'displaySmall'}>멘토 / 운영진 페이지</Typography>
          <Typography variant={'bodyMedium'}>
            2024학년도 2학기 멘토 및 운영진을 위한 페이지입니다. 멘토의 기준은
            해당 학기에 스터디 승인을 받은 부원입니다.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            startIcon={<GoogleIcon />}
            onClick={() => handleSignIn()}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              py: 1.5,
              textTransform: 'none', // Capitalization 제거
            }}
          >
            Sign in with Google
          </Button>
        </Stack>
      </CenteredBox>
    </Stack>
  );
}
