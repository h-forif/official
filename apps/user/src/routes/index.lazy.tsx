import { ReactNode, useCallback, useState } from 'react';

import { Popover } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Stack } from '@mui/system';

import InstagramIcon from '@assets/images/Instagram.svg';
import ChannelAddIcon from '@assets/images/channel_add_large.png';
import StandingPerson1 from '@assets/images/peep-main-1.svg';
import StandingPerson2 from '@assets/images/peep-main-2.svg';
import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { handleGlobalError } from '@utils/handleGlobalError';
import { signIn } from 'src/services/auth.service';

import { LogoWall } from '@components/LogoWall';
import AnimatedContainer from '@components/study/AnimatedStudyContainer';
import { StudyCard } from '@components/study/StudyCard';

export const Route = createLazyFileRoute('/')({
  component: Home,
});
const GOOGLE_CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;

function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const navigate = useNavigate();

  const signInWithToken = async (tokenResponse: TokenResponse) => {
    console.log(tokenResponse.access_token);

    try {
      await signIn(tokenResponse.access_token);
      navigate({ to: '/profile' });
    } catch (err) {
      handleGlobalError(err);
    }
  };

  const client = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/userinfo.email',
    callback: signInWithToken,
  });

  const handleSignIn = useCallback(async () => {
    if (client) {
      client.requestAccessToken();
    } else {
      console.error('Google OAuth2 client is not initialized.');
    }
  }, [client]);

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
        <AnimatedContainer>
          <StudyCard id={5} title={'리액트 배우기'} mentor={'표준성'} />
        </AnimatedContainer>
        {matches && (
          <>
            <ImagePopover hPosition={'right'} src={StandingPerson1}>
              <a href={'http://pf.kakao.com/_xiydUG'} target='_blank'>
                <img
                  src={ChannelAddIcon}
                  width={114}
                  height={45}
                  alt='카카오톡 채널 추가 아이콘'
                />
              </a>
            </ImagePopover>
            <ImagePopover hPosition={'left'} src={StandingPerson2}>
              <Stack
                direction={'row'}
                alignItems={'center'}
                component={'a'}
                href={'https://www.instagram.com/forif_hyu'}
                target='_blank'
              >
                <img
                  src={InstagramIcon}
                  width={80}
                  height={45}
                  alt='카카오톡 채널 추가 아이콘'
                />
                <Typography variant='labelSmall' color='text.primary'>
                  @forif_hyu
                </Typography>
              </Stack>
            </ImagePopover>
          </>
        )}
      </CenteredBox>
      <LogoWall />
    </main>
  );
}

function ImagePopover({
  src,
  hPosition,
  children,
}: {
  children: ReactNode;
  src: string;
  hPosition: 'left' | 'right';
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <img
        src={src}
        width={200}
        aria-describedby={id}
        height={300}
        style={{
          position: 'fixed',
          bottom: 8,
          [hPosition]: 16,
          zIndex: 1,
          cursor: 'pointer',
        }}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'transparent',
              backgroundImage: 'none',
            },
          },
        }}
      >
        {children}
      </Popover>
    </>
  );
}
