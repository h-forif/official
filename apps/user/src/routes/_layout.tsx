import { useEffect, useState } from 'react';

import { Box, Tab, Tabs } from '@mui/material';

import { PROFILE_NAV_MENUS } from '@constants/nav-menu.constant';
import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
} from '@tanstack/react-router';

import useDeviceSize from '@hooks/useDeviceSize';

export const Route = createFileRoute('/_layout')({
  component: ProfileLayout,
});

function ProfileLayout() {
  const { pathname } = useLocation();
  const { isMobile } = useDeviceSize();
  const [value, setValue] = useState(pathname);

  useEffect(() => {
    if (pathname.startsWith('/profile')) {
      setValue(pathname);
    }
  }, [pathname]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: '100%',
        pt: isMobile ? 0 : 8,
        width: '100%',
      }}
    >
      <Tabs
        value={value}
        onChange={(_event, newValue: string) => {
          if (newValue.startsWith('/profile')) {
            setValue(newValue);
          }
        }}
        orientation={isMobile ? 'horizontal' : 'vertical'}
        aria-label='Profile Vertical Tabs'
        role='navigation'
        variant={isMobile ? 'scrollable' : 'standard'}
        centered={isMobile ? false : true}
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
          pt: isMobile ? 4 : 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
