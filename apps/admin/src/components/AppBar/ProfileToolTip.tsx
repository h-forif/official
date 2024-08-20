import { useState } from 'react';

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import { clearUser } from '@stores/user.store';
import { Link, useNavigate } from '@tanstack/react-router';

export function ProfileToolTip() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    clearUser();
    navigate({
      to: '/',
    });
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='FORIF-TEAM' src='/forif-circle.svg' />
        </IconButton>
      </Tooltip>
      <Menu
        slotProps={{
          paper: {
            sx: {
              width: '200px',
            },
          },
        }}
        sx={{ mt: '48px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Link to='/' width={'100%'} onClick={handleCloseUserMenu}>
          <MenuItem>
            <Typography textAlign='center' color={'text.primary'}>
              대시보드
            </Typography>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleSignOut}>
          <Typography textAlign='center'>로그아웃</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
