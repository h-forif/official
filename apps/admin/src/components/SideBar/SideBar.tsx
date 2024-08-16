import { useEffect, useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useMediaQuery } from '@mui/system';

import { AUTH_LEVEL } from '@constants/auth.constant';
import {
  ADMIN_NAV_MENUS,
  NAV_MENUS,
  NavMenu,
} from '@constants/nav-menu.constant.tsx';
import { clearUser, getUser } from '@stores/user.store';
import { useLocation, useNavigate } from '@tanstack/react-router';

const drawerWidth = 240;

export default function SideBar() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const user = getUser();

  const navigate = useNavigate();
  const [selectedNavMenus, setSelectedNavMenus] = useState<NavMenu[] | null>(
    NAV_MENUS,
  );

  useEffect(() => {
    if (!user) {
      setSelectedNavMenus(null);
    } else {
      if (user.auth_level! >= 3) {
        setSelectedNavMenus(ADMIN_NAV_MENUS);
      } else {
        setSelectedNavMenus(NAV_MENUS);
      }
    }
  }, [user]);

  const handleSignOut = () => {
    clearUser();
    navigate({
      to: '/',
    });
  };

  return (
    location.pathname !== '/' && (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#f5f7f9',
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor='left'
      >
        <Toolbar>
          <Typography variant='bodySmall'>
            반가워요, {AUTH_LEVEL[user.auth_level!]}{' '}
            <strong>{user.name}</strong>님.
          </Typography>
          <Typography variant='bodySmall'></Typography>
        </Toolbar>
        <Divider />
        <List
          sx={{
            '& .MuiListItemIcon-root': {
              minWidth: 40,
            },
            '& .MuiListItemButton-root': {
              py: 1,
            },
            px: 2,
            pb: 2,
          }}
        >
          {selectedNavMenus &&
            selectedNavMenus.map((menu) => (
              <Box key={menu.title}>
                <Stack direction={'row'} alignItems={'center'} my={2}>
                  <ListItemIcon>
                    {menu.icon ? menu.icon : <InboxIcon />}
                  </ListItemIcon>
                  <Typography variant='labelMedium'>{menu.title}</Typography>
                </Stack>
                {menu.submenu &&
                  menu.submenu.map((submenu, index) => (
                    <ListItem
                      key={`menu-${index}`}
                      onClick={() => navigate({ to: submenu.href })}
                      disableGutters
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemText
                          primary={
                            <Typography variant='bodySmall'>
                              {submenu.title}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </Box>
            ))}
          <Stack direction={'row'} alignItems={'center'} my={2}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <Typography variant='labelMedium'>계정</Typography>
          </Stack>
          <ListItem disableGutters disablePadding>
            <ListItemButton onClick={handleSignOut}>
              <ListItemText
                primary={<Typography variant='bodySmall'>로그아웃</Typography>}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    )
  );
}
