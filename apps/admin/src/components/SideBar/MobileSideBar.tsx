import { useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';

import { AUTH_LEVEL } from '@constants/auth.constant';
import { useDrawerStore } from '@stores/drawer.store';
import { clearUser, getUser } from '@stores/user.store';
import { useLocation, useNavigate } from '@tanstack/react-router';

import useNavMenu from '@hooks/useNavMenu';

const drawerWidth = 240;

export default function MobileSideBar() {
  const location = useLocation();
  const user = getUser();
  const { menus } = useNavMenu();
  const navigate = useNavigate();

  const handleSignOut = () => {
    clearUser();
    navigate({
      to: '/',
    });
  };

  // State to manage which menu is open
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const handleMenuToggle = (menuTitle: string) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuTitle]: !prevState[menuTitle],
    }));
  };

  // For Mobile Navigation
  const { open, setOpen, isClosing, setIsClosing } = useDrawerStore();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setOpen(!open);
    }
  };

  return (
    location.pathname !== '/' && (
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: 'background.default',
            },
          }}
          variant='temporary'
          open={open}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Toolbar>
            <Typography variant='bodySmall'>
              반가워요, {AUTH_LEVEL[user.auth_level!]}{' '}
              <strong>{user.name}</strong>님.
            </Typography>
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
            {menus &&
              menus.map((menu) => (
                <Box key={menu.title}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent='space-between'
                    my={2}
                    onClick={() => handleMenuToggle(menu.title)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Stack direction={'row'} alignItems={'center'}>
                      <ListItemIcon>
                        {menu.icon ? menu.icon : <InboxIcon />}
                      </ListItemIcon>
                      <Typography variant='labelMedium'>
                        {menu.title}
                      </Typography>
                    </Stack>
                    {menu.submenu ? (
                      openMenus[menu.title] ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )
                    ) : null}
                  </Stack>
                  {menu.submenu && (
                    <Collapse
                      in={openMenus[menu.title]}
                      timeout='auto'
                      unmountOnExit
                    >
                      {menu.submenu.map((submenu, index) => (
                        <ListItem
                          key={`submenu-${index}`}
                          onClick={() => {
                            navigate({ to: submenu.href });
                            handleDrawerToggle();
                          }}
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
                    </Collapse>
                  )}
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
                  primary={
                    <Typography variant='bodySmall'>로그아웃</Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    )
  );
}
