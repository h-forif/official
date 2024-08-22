import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/system';

import DarkLetterIcon from '@assets/logos/forif-letter-dark.svg?react';
import LetterIcon from '@assets/logos/forif-letter.svg?react';
import { Button } from '@packages/components/Button';
import ToggleColorMode from '@packages/components/ToggleColorMode';
import { setRefreshToken } from '@stores/token.store';
import { clearUser, getUserState } from '@stores/user.store';
import { Link } from '@tanstack/react-router';

import { useNavMenu } from '@hooks/useNavMenu';
import useScrollPosition from '@hooks/useScrollPosition';
import { useSignIn } from '@hooks/useSignIn';

import { AppBarProps } from '../../types/app-bar.type';
import { DesktopNav } from './DesktopNav';
import MobileNav from './MobileNav';

export default function AppBar({ mode, toggleColorMode }: AppBarProps) {
  const scrollPosition = useScrollPosition();
  const { activeMenu, handleMouseEnter, handleMouseLeave, handleClick } =
    useNavMenu();

  const userState = getUserState();

  const { handleSignIn } = useSignIn();

  const handleSignOut = () => {
    setRefreshToken(null);
    clearUser();
    window.location.href = '/';
  };

  return (
    <>
      <MUIAppBar
        position='static'
        sx={{
          boxShadow: scrollPosition === 0 ? 0 : '0 2px 4px 0 rgba(0,0,0,.2)',
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
            <Link
              to='/'
              style={{
                marginRight: 64,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {mode === 'light' ? (
                <LetterIcon width={100} height={'64'} />
              ) : (
                <DarkLetterIcon width={100} height={'64'} />
              )}
            </Link>
            <DesktopNav
              activeMenu={activeMenu}
              handleClick={handleClick}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              userState={userState}
            />
          </Box>
          <MobileNav
            mode={mode}
            userState={userState}
            toggleColorMode={toggleColorMode}
            handleSignIn={handleSignIn}
            handleSignOut={handleSignOut}
          />
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
