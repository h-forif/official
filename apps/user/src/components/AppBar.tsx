import { useEffect, useRef, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/system';

import { Button } from '@packages/components/Button';
import { MenuItem } from '@packages/components/MenuItem';
import { PaletteMode } from '@packages/components/PaletteMode';
import ToggleColorMode from '@packages/components/ToggleColorMode';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';

import LetterIcon from '../assets/images/letter-mark.svg?react';

interface AppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const menus = [
  {
    title: 'FORIF',
    href: '/club/about',
    submenu: [
      { title: '포리프', href: '/club/about' },
      { title: '포리프 팀', href: '/club/team' },
    ],
  },
  {
    title: '스터디',
    href: '/studies',
    submenu: [
      { title: '스터디 목록', href: '/studies' },
      { title: '스터디 지원', href: '/apply/member' },
    ],
  },
  {
    title: '자주 묻는 질문',
    href: '/about',
  },
];

export default function AppBar({ mode, toggleColorMode }: AppBarProps) {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const theme = useTheme();
  const navRef = useRef<HTMLDivElement>(null);
  const backgroundColor = theme.palette.mode === 'light' ? 'white' : 'black';
  const toggleDrawer = (status: boolean) => () => {
    setOpen(status);
  };
  const timerRef = useRef<number | null>(null);
  const handleMouseEnter = (menuTitle: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setActiveMenu(menuTitle);
    }, 200); // 100ms 디바운스
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (!navRef.current?.matches(':hover')) {
        setActiveMenu(null);
      }
    }, 100); // 100ms 디바운스
  };

  const handleClick = () => {
    setActiveMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <MUIAppBar
        position='fixed'
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          width: '100%',
          zIndex: 1100,
        }}
      >
        <MyToolBar variant='dense'>
          {/* PC / Tablet */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 0,
            }}
          >
            <Link to='/' style={{ marginRight: '60px' }}>
              <LetterIcon width={100} />
            </Link>
            <Box
              sx={{ display: { xs: 'none', md: 'flex' } }}
              onMouseLeave={handleMouseLeave}
            >
              {menus.map((menu) => (
                <Box
                  key={`${menu.title} - ${menu.href}`}
                  onMouseEnter={() => handleMouseEnter(menu.title)}
                  onClick={handleClick}
                >
                  <Link to={menu.href}>
                    <MenuItem sx={{ py: '8px', px: '12px' }}>
                      <Typography
                        variant='bodySmall'
                        color='text.primary'
                        fontWeight={500}
                      >
                        {menu.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                  <AnimatePresence>
                    {activeMenu === menu.title && menu.submenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          zIndex: 1,
                          backgroundColor: backgroundColor,
                          borderRadius: '4px',
                          width: '100%',
                          padding: '50px 18.7% 55px',
                          boxShadow:
                            theme.palette.mode === 'light'
                              ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                              : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        }}
                      >
                        {menu.submenu.map((subItem) => (
                          <NavItem sx={{ my: 2 }}>
                            <Link key={subItem.title} to={subItem.href}>
                              <Typography
                                variant='titleLarge'
                                color='text.primary'
                              >
                                {subItem.title}
                              </Typography>
                            </Link>
                          </NavItem>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            <Button color='primary' variant='text' size='small' component='a'>
              한양대학교 로그인
            </Button>
            <Button
              color='primary'
              variant='contained'
              size='small'
              component='a'
            >
              회원가입
            </Button>
          </Box>
          {/* Mobile */}
          <Box sx={{ display: { sm: '', md: 'none' } }}>
            <Button
              variant='text'
              color='primary'
              aria-label='menu'
              onClick={toggleDrawer(true)}
              sx={{ minWidth: '30px', p: '4px' }}
            >
              <MenuIcon />
            </Button>
            <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: '60dvw',
                  p: 2,
                  backgroundColor: 'background.paper',
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    flexGrow: 1,
                  }}
                >
                  <ToggleColorMode
                    mode={mode}
                    toggleColorMode={toggleColorMode}
                  />
                </Box>
                {menus.map((menu) => (
                  <Link
                    key={menu.title}
                    to={menu.href}
                    onClick={toggleDrawer(false)}
                  >
                    <MenuItem key={menu.title} sx={{ color: 'text.primary' }}>
                      {menu.title}
                    </MenuItem>
                  </Link>
                ))}
                <Divider />
                <MenuItem>
                  <Button
                    color='primary'
                    variant='contained'
                    component='a'
                    sx={{ width: '100%' }}
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color='primary'
                    variant='outlined'
                    component='a'
                    sx={{ width: '100%' }}
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
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
          onClick={() => setActiveMenu(null)}
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
  height: 60,
  zIndex: 1100,
}));

const NavItem = styled('a')(({ theme }) => ({
  position: 'relative',
  display: 'block',
  width: 'fit-content',
  margin: '8px 0', // 위아래 간격을 위한 마진
  '& > *': {
    // Typography 컴포넌트에 대한 스타일
    display: 'block',
    padding: '4px 0', // 위아래로만 약간의 패딩
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '3px',
    bottom: '-2px', // underline 위치 조정
    left: '0', // 왼쪽에서 시작
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.2s ease',
  },
  '&:hover::after': {
    width: '100%',
  },
}));
