import { useCallback, useEffect, useState } from 'react';

import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/system';

import LetterIcon from '@assets/images/letter-mark.svg?react';
import { Button } from '@packages/components/Button';
import ToggleColorMode from '@packages/components/ToggleColorMode';
import { setRefreshToken } from '@store/token.store';
import { clearUser, getUserState } from '@store/user.store';
import { useNavigate } from '@tanstack/react-router';
import { handleGlobalError } from '@utils/handleGlobalError';
import { motion, useAnimation } from 'framer-motion';
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

  const signInWithToken = async (tokenResponse: TokenResponse) => {
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

  const handleSignOut = () => {
    setRefreshToken(null);
    clearUser();
    navigate({ to: '/' });
  };

  return (
    <>
      <motion.div
        initial='visible'
        animate={controls}
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <MUIAppBar
          position='sticky'
          sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
            width: '100%',
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
              <a href='/' style={{ marginRight: 64 }}>
                <LetterIcon width={100} />
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
              backdropFilter: 'blur(5px)',
              zIndex: 1000,
            }}
          />
        )}
      </motion.div>
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
