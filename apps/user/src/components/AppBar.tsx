import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import { Button } from '@packages/components/Button';
import { MenuItem } from '@packages/components/MenuItem';
import { PaletteMode } from '@packages/components/PaletteMode';
import ToggleColorMode from '@packages/components/ToggleColorMode';
import { Link } from '@tanstack/react-router';

import LetterIcon from '../assets/images/letter-mark.svg?react';
import useScrollPosition from '../hooks/useScrollPosition';

interface AppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const menus = [
  {
    title: 'FORIF',
    href: '/about',
  },
  {
    title: 'FORIF TEAM',
    href: '/team',
  },
  {
    title: '스터디 목록',
    href: '/price',
  },
  {
    title: '자주 묻는 질문',
    href: '/about',
  },
];

export default function AppBar({ mode, toggleColorMode }: AppBarProps) {
  const [open, setOpen] = React.useState(false);
  const scrollPos = useScrollPosition();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <MUIAppBar
        position='fixed'
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          width: '100%',
          paddingX: 3,
        }}
      >
        <MyToolBar
          variant='dense'
          sx={{
            backdropFilter: scrollPos === 0 ? '' : 'blur(24px)',
            borderBottom: scrollPos === 0 ? '' : '1px solid',
            borderColor: 'divider',
            boxShadow: scrollPos === 0 ? 'none' : '',
          }}
        >
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
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {menus.map((menu) => (
                <Link key={`${menu.title} - ${menu.href}`} to={menu.href}>
                  <MenuItem sx={{ py: '8px', px: '12px', borderRadius: 2 }}>
                    <Typography
                      variant='bodySmall'
                      color='text.primary'
                      fontWeight={500}
                    >
                      {menu.title}
                    </Typography>
                  </MenuItem>
                </Link>
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
                  <MenuItem key={menu.title} onClick={() => {}}>
                    {menu.title}
                  </MenuItem>
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
    </div>
  );
}

const MyToolBar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  backgroundColor: 'transparent',
  height: 60,
  boxShadow:
    theme.palette.mode === 'light'
      ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
      : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
}));
