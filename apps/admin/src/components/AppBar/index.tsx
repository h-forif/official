import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

import { NavMenu } from '@constants/nav-menu.constant';
import { IconButton } from '@packages/components/Button';
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
  return (
    location.pathname !== '/' && (
      <AppBar position='static' color='transparent'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
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
