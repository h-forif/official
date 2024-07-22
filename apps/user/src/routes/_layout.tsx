import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';

import { PROFILE_NAV_MENUS } from '@constants/nav-menu.constant';
import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
  component: ProfileLayout,
});

function ProfileLayout() {
  const pathname = useLocation().pathname;
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: isPhone ? 'column' : 'row',
        height: '100%',
        pt: isPhone ? 0 : 8,
      }}
    >
      <Tabs
        value={pathname}
        orientation={isPhone ? 'horizontal' : 'vertical'}
        aria-label='Profile Vertical Tabs'
        role='navigation'
        variant={isPhone ? 'scrollable' : 'standard'}
        centered
        sx={{
          '.MuiTab-root': {
            paddingX: 6,
            paddingY: 3,
            fontSize: 16,
            whiteSpace: 'nowrap',
            textAlign: 'center',
          },
        }}
      >
        {PROFILE_NAV_MENUS.map((menu, index) => (
          <Tab label={menu.title} />
        ))}
      </Tabs>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          width: '100%',
          pt: isPhone ? 4 : 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

const LinkTab = styled(Link)(({ theme }) => ({
  padding: theme.spacing(3),
  fontSize: 16,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  width: '100%',
  color: theme.palette.text.primary,
}));
