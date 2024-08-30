import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import { NavMenu } from '@constants/nav-menu.constant';
import { useDrawerStore } from '@stores/drawer.store';
import { useLocation } from '@tanstack/react-router';

import useNavMenu from '@hooks/useNavMenu';

import { ProfileToolTip } from './ProfileToolTip';

function findMenuTitle(menus: NavMenu[], pathname: string): string | undefined {
  for (const menu of menus) {
    if (menu.href === pathname) {
      return menu.title;
    }

    if (menu.submenu) {
      const found = menu.submenu.find((subMenu) => subMenu.href === pathname);
      if (found) {
        return found.title;
      }
    }
  }

  return undefined;
}
export default function TopBar() {
  const location = useLocation();
  const { menus } = useNavMenu();
  const title = findMenuTitle(menus!, location.pathname);

  const { open, setOpen, isClosing } = useDrawerStore();

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setOpen(!open);
    }
  };

  return (
    location.pathname !== '/' && (
      <AppBar position='static' color='transparent'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='titleMedium'>{title}</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size='large'
                aria-label='show 4 new mails'
                color='inherit'
              >
                <MailOutlineIcon />
              </IconButton>
              <IconButton
                size='large'
                aria-label='show 17 new notifications'
                color='inherit'
              >
                <NotificationsOutlinedIcon />
              </IconButton>
            </Box>
            <ProfileToolTip />
          </Toolbar>
        </Container>
      </AppBar>
    )
  );
}
