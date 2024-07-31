import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';

import banner from '@assets/images/banner.svg';
import { Button } from '@packages/components/Button';
import Image from '@packages/components/Image';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Link, createLazyFileRoute } from '@tanstack/react-router';

import AnimatedContainer from '@components/study/AnimatedStudyContainer';

import { useSignIn } from '@hooks/useSignIn';

export const Route = createLazyFileRoute('/')({
  component: Home,
});

function Home() {
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
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Button variant='contained' onClick={handleSignIn}>
            부원 가입하기
          </Button>
          <Link to='/apply/mentor'>
            <Button variant='outlined'>멘토 신청하기</Button>
          </Link>
        </Stack>
        <AnimatedContainer>스터디 목록이 들어갈 자리입니다.</AnimatedContainer>
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
