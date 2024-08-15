import { useRef } from 'react';

import GoogleIcon from '@mui/icons-material/Google';
import { Stack, Typography } from '@mui/material';

import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { useGoogleLogin } from '@react-oauth/google';
import { signIn } from '@services/auth.service';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { motion, useDragControls } from 'framer-motion';

import getIsAuthenticated from '@hooks/isAuthenticated';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const isAuthenticated = await getIsAuthenticated();
    if (isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  component: Home,
});

function Home() {
  const controls = useDragControls();
  const navigate = useNavigate();
  const constraintsRef = useRef(null);
  const handleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse.access_token);

      try {
        await signIn(tokenResponse.access_token);
        navigate({ to: '/dashboard' });
      } catch (err) {
        console.error(err);
      }
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
