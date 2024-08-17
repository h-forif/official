import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';

import banner from '@assets/images/banner.svg';
import {
  MENTOR_RECRUIT_END_DATE,
  MENTOR_RECRUIT_START_DATE,
  RECRUIT_END_DATE,
  RECRUIT_START_DATE,
} from '@constants/apply.constant';
import { Button } from '@packages/components/Button';
import Image from '@packages/components/Image';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { getUserState } from '@stores/user.store';
import { Link, createFileRoute } from '@tanstack/react-router';

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
      <Image
        src={banner}
        alt={`forif-main-banner`}
        loading='lazy'
        title={'main-banner'}
        width={'100%'}
        style={{ objectFit: 'contain' }}
        fallback={''}
      />
    </main>
  );
}
