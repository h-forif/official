import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/system';

import Box1 from '@assets/images/main/box1.svg';
import Box2 from '@assets/images/main/box2.svg';
import Box3 from '@assets/images/main/box3.svg';
import Box4 from '@assets/images/main/box4.svg';
import Box5 from '@assets/images/main/box5.svg';
import {
  MENTOR_RECRUIT_END_DATE,
  MENTOR_RECRUIT_START_DATE,
  RECRUIT_END_DATE,
  RECRUIT_START_DATE,
} from '@constants/apply.constant';
import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { getUserState } from '@stores/user.store';
import { Link, createFileRoute } from '@tanstack/react-router';

import GravityBox from '@components/main/GravityBox';
import AnimatedContainer from '@components/study/AnimatedStudyContainer';

import { usePeriod } from '@hooks/usePeriod';
import { useSignIn } from '@hooks/useSignIn';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const userState = getUserState();

  const { handleSignIn } = useSignIn();
  const { isIncluded } = usePeriod(
    MENTOR_RECRUIT_START_DATE,
    MENTOR_RECRUIT_END_DATE,
  );

  return (
    <main>
      <CenteredBox
        sx={{
          paddingX: 3,
          paddingTop: 12,
          paddingBottom: 3,
          gap: 3,
          textAlign: 'center',
          maxWidth: '780px',
          margin: 'auto',
        }}
      >
        <Typography
          variant='displayLarge'
          color='text.primary'
          sx={{ textTransform: 'uppercase' }}
        >
          Upgrade your passion
        </Typography>
        <Typography variant='titleLarge' fontWeight={300} color='text.primary'>
          프로그래밍을 하고 싶은 누구나, 포리프와 함께
        </Typography>
        <Typography variant='labelLarge' color='text.secondary'>
          {RECRUIT_START_DATE} - {RECRUIT_END_DATE}
        </Typography>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          {userState === 'sign-out' && (
            <Button variant='contained' onClick={handleSignIn}>
              부원 가입하기
            </Button>
          )}

          <Link to='/apply/mentor' disabled={!isIncluded}>
            <Button variant='outlined' disabled={!isIncluded}>
              멘토 신청하기
            </Button>
          </Link>
        </Stack>
        <AnimatedContainer>현재 스터디 모집 중입니다.</AnimatedContainer>
      </CenteredBox>
      <Box sx={{ backgroundColor: '#1D40BA' }}>
        <GravityBox images={[Box1, Box2, Box3, Box4, Box5]} />
      </Box>
    </main>
  );
}
