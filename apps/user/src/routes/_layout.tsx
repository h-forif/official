import { useState } from 'react';

import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';

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
  const [, setValue] = useState(pathname);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: isPhone ? 'column' : 'row',
        height: '100%',
        pt: isPhone ? 0 : 8,
        width: '100%',
      }}
    >
      <Tabs
        value={pathname}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        orientation={isPhone ? 'horizontal' : 'vertical'}
        aria-label='Profile Vertical Tabs'
        role='navigation'
        variant={isPhone ? 'scrollable' : 'standard'}
        centered={isPhone ? false : true}
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
          <Tab
            component={Link}
            to={menu.href}
            key={index}
            label={menu.title}
            value={menu.href}
          />
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
