import React from 'react';

import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';

import { PROFILE_NAV_MENUS } from '@constants/nav-menu.constant';
import {
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
  component: ProfileLayout,
});

interface LinkTabProps {
  label?: string;
  href?: string;
  selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
  const navigate = useNavigate();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    navigate({ to: props.href! });
  };

  return (
    <Tab
      component='a'
      onClick={handleClick}
      aria-current={props.selected ? 'page' : undefined}
      {...props}
    />
  );
}

function ProfileLayout() {
  const pathname = useLocation().pathname;
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const tabValue = PROFILE_NAV_MENUS.findIndex(
    (menu) => menu.href === pathname,
  );

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
        value={tabValue}
        orientation={isPhone ? 'horizontal' : 'vertical'}
        aria-label='Profile Vertical Tabs'
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
        {PROFILE_NAV_MENUS.map((menu) => (
          <LinkTab
            key={menu.title}
            label={menu.title}
            href={menu.href}
            selected={pathname === menu.href}
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
