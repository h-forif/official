import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';

import banner from '@assets/images/banner.svg';
import { Button } from '@packages/components/Button';
import Image from '@packages/components/Image';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { getUserState } from '@stores/user.store';
import { Link, createFileRoute } from '@tanstack/react-router';

import AnimatedContainer from '@components/study/AnimatedStudyContainer';

import { useSignIn } from '@hooks/useSignIn';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const userState = getUserState();
  const { handleSignIn } = useSignIn();

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
          지식 공유의 선순환을 행하고, 이를 토대로 함께 성장하고자 합니다. 지금
          선순환에 동참해주세요.
        </Typography>
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={1}
          width={userState === 'sign-in' ? '100%' : 'fit-content'}
        >
          {userState === 'sign-out' && (
            <Button variant='contained' onClick={handleSignIn}>
              부원 가입하기
            </Button>
          )}

          <Link
            to='/apply/mentor'
            style={{
              width: userState === 'sign-in' ? '100%' : 'fit-content',
            }}
          >
            <Button variant='outlined' fullWidth>
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
