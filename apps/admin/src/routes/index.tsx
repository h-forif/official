import { useRef } from 'react';

import GoogleIcon from '@mui/icons-material/Google';
import { Stack, Typography } from '@mui/material';

import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { useGoogleLogin } from '@react-oauth/google';
import { signIn } from '@services/auth.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
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
  const { semester, year } = getCurrentTerm();
  const handleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
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
      } catch (err) {
        console.error(err);
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
    y: Math.random() * 500 - 500, // Random y-axis translation
    rotate: Math.random() * 360, // Random rotation
    scale: 1 + Math.random() * 0.5, // Random scale
    duration: Math.random() * 0.8 + 0.5, // Random duration
  });

  const generateInitialPosition = (index: number) => {
    const positions = [];
    let left = 0;
    for (let i = 0; i < INITIAL_BALL_NUMBER; i++) {
      positions.push({ top: '80%', left: `${left}%` });
      left += 5;
    }
    return positions[index];
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
        <motion.div
          ref={constraintsRef}
          style={{ width: '100%', height: '100%' }}
        >
          {Array.from({ length: INITIAL_BALL_NUMBER }).map((_, i) => {
            const { x, y, rotate } = generateRandomValues();
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
                }}
                style={{
                  width: INITIAL_BALL_SIZE,
                  height: INITIAL_BALL_SIZE,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  position: 'absolute',
                }}
              />
            );
          })}
        </motion.div>
      </Stack>
      <CenteredBox
        maxWidth={'50%'}
        p={5}
        textAlign={'center'}
        flexGrow={1}
        height={'100%'}
      >
        <Stack gap={2} width={'100%'}>
          <Typography variant={'displaySmall'}>FORIF-ADMIN</Typography>
          <Typography variant={'bodyMedium'}>
            {year}학년도 {semester}학기 멘토 및 운영진을 위한 페이지입니다.
            부원용 페이지에서 학교계정으로 회원가입 후 해당 계정으로
            로그인해주세요. 로그인이 되지 않는다면 SW팀 혹은 회장단에게
            문의해주세요.
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
            한양대학교 계정(hanyang.ac.kr)으로 로그인해주세요.
          </Button>
        </Stack>
      </CenteredBox>
    </Stack>
  );
}
