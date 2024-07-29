import { useCallback, useEffect, useState } from 'react';

import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/system';

import LetterIcon from '@assets/logos/forif-letter.svg?react';
import { Button } from '@packages/components/Button';
import ToggleColorMode from '@packages/components/ToggleColorMode';
import { setRefreshToken, useAccessToken } from '@stores/token.store';
import { clearUser, getUserState, setUserState } from '@stores/user.store';
import { useNavigate } from '@tanstack/react-router';
import { handleGlobalError } from '@utils/handleGlobalError';
import axios from 'axios';
import { useAnimation } from 'framer-motion';
import { signIn } from 'src/services/auth.service';

import { useNavMenu } from '@hooks/useNavMenu';
import useScrollPosition from '@hooks/useScrollPosition';

import { AppBarProps } from '../../types/app-bar.type';
import { DesktopNav } from './DesktopNav';
import MobileNav from './MobileNav';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;

export default function AppBar({ mode, toggleColorMode }: AppBarProps) {
  const scrollPosition = useScrollPosition();
  const [isVisible, setIsVisible] = useState(true);
  const controls = useAnimation();

  const navigate = useNavigate();
  const { activeMenu, handleMouseEnter, handleMouseLeave, handleClick } =
    useNavMenu();

  useEffect(() => {
    if (scrollPosition > 64) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [scrollPosition]);

  useEffect(() => {
    if (isVisible) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isVisible, controls]);

  const userState = getUserState();

  const accessToken = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      setUserState('sign-in');
    }
  }, [accessToken]);

  const signInWithToken = async (tokenResponse: TokenResponse) => {
    try {
      await signIn(tokenResponse.access_token);
      navigate({ to: '/profile' });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        navigate({
          to: '/auth/sign-up',
          params: { tokenResponse },
        });
      } else {
        handleGlobalError(err);
      }
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

  const handleSignOut = () => {
    setRefreshToken(null);
    clearUser();
    navigate({ to: '/' });
  };

  // userState가 null이면 로딩 상태 표시
  if (userState === null) {
    return null;
  }

  return (
    <>
      <MUIAppBar
        position='static'
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          width: '100%',
        }}
        style={{
          zIndex: 1100,
        }}
      >
        <MyToolBar variant='regular'>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 3,
            }}
          >
            <a
              href='/'
              style={{
                marginRight: 64,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LetterIcon width={100} height={'64'} />
            </a>
            <DesktopNav
              activeMenu={activeMenu}
              handleClick={handleClick}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              userState={userState}
            />
          </Box>
          <MobileNav mode={mode} toggleColorMode={toggleColorMode} />
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            {userState === 'sign-out' ? (
              <>
                <Button
                  color='primary'
                  variant='text'
                  size='small'
                  onClick={handleSignIn}
                >
                  한양대학교 로그인
                </Button>
                <Button
                  color='primary'
                  variant='contained'
                  size='small'
                  onClick={handleSignIn}
                >
                  회원가입
                </Button>
              </>
            ) : (
              <Button
                color='primary'
                variant='contained'
                size='small'
                onClick={handleSignOut}
              >
                로그아웃
              </Button>
            )}
          </Box>
        </MyToolBar>
      </MUIAppBar>
      {activeMenu && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            height: '100vh',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
          }}
        />
      )}
    </>
  );
}

const MyToolBar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  backgroundColor: theme.palette.mode === 'light' ? 'white' : 'black',
  height: 64,
  zIndex: 1100,
}));
