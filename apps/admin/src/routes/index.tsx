import { useRef, useState } from 'react';

import GoogleIcon from '@mui/icons-material/Google';
import { Container, Slider, Stack, Typography } from '@mui/material';

import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { useGoogleLogin } from '@react-oauth/google';
import { signIn } from '@services/auth.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { motion, useDragControls } from 'framer-motion';

export const Route = createFileRoute('/')({
  component: Home,
});

const INITIAL_BALL_NUMBER = 18;
const INITIAL_BALL_SIZE = 24;

function Home() {
  const controls = useDragControls();
  const navigate = useNavigate();
  const { openSingleButtonDialog } = useDialogStore();
  const constraintsRef = useRef(null);

  const handleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await signIn(tokenResponse.access_token);
        console.log(res);

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
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          openSingleButtonDialog({
            title: '등록되지 않은 계정입니다.',
            message:
              '홈페이지에 가입하지 않았거나, 한양대학교 이메일 계정이 아닌지 확인해주세요.',
            dialogIconType: DialogIconType.WARNING,
            mainButtonText: '확인',
          });
          return;
        }
      }
    },
  });

  const generateRandomValues = () => ({
    x: Math.random() * 200 - 100, // Random x-axis translation
    y: Math.random() * 200 - 100, // Random y-axis translation
    rotate: Math.random() * 360, // Random rotation
    scale: 1 + Math.random() * 0.5, // Random scale
    duration: Math.random() * 0.8 + 0.5, // Random duration
  });

  const generateInitialPosition = (index: number) => {
    const positions = [];
    let left = 0;
    for (let i = 0; i < ballCount; i++) {
      positions.push({ top: '80%', left: `${left}%` });
      left += 5;
    }
    return positions[index];
  };

  const [ballCount, setBallCount] = useState(INITIAL_BALL_NUMBER);
  const [ballSize, setBallSize] = useState(INITIAL_BALL_SIZE);
  const handleCountChange = (event: Event, newValue: number | number[]) => {
    setBallCount(newValue as number);
  };

  const handleSizeChange = (event: Event, newValue: number | number[]) => {
    setBallSize(newValue as number);
  };

  return (
    <Stack direction={'row'} height={'100vh'}>
      <Stack
        width={'50%'}
        height={'100%'}
        sx={{
          backgroundColor: 'primary.dark',
          display: { xs: 'none', sm: 'block' },
          position: 'relative',
        }}
      >
        <Container
          sx={{
            my: 2,
          }}
        >
          <Typography variant='titleLarge' color={'white'}>
            COUNT: {ballCount}
          </Typography>
          <Slider
            aria-label='balls'
            value={ballCount}
            onChange={handleCountChange}
          />
          <Typography variant='titleLarge' color={'white'}>
            SIZE: {ballSize}
          </Typography>
          <Slider
            aria-label='balls'
            value={ballSize}
            onChange={handleSizeChange}
          />
        </Container>
        <motion.div
          ref={constraintsRef}
          style={{ width: '100%', height: '100%' }}
        >
          {Array.from({ length: ballCount }).map((_, i) => {
            const { x, y, rotate, scale, duration } = generateRandomValues();
            return (
              <motion.div
                key={i}
                drag
                dragControls={controls}
                dragConstraints={constraintsRef}
                initial={generateInitialPosition(i)}
                animate={{
                  x,
                  y,
                  rotate,
                  scale,
                  transition: {
                    duration,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                }}
                style={{
                  width: ballSize,
                  height: ballSize,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  position: 'absolute',
                }}
              />
            );
          })}
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
              textTransform: 'none',
            }}
          >
            Sign in with Google
          </Button>
        </Stack>
      </CenteredBox>
    </Stack>
  );
}
