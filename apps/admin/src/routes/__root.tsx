import { Box, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/system/ThemeProvider';

import { lightTheme } from '@packages/components/theme.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute, redirect } from '@tanstack/react-router';

import TopBar from '@components/AppBar';
import MobileSideBar from '@components/SideBar/MobileSideBar';
import SideBar from '@components/SideBar/SideBar';
import { AlertDialog } from '@components/common/Dialog';

import { isAuthenticated } from '@hooks/isAuthenticated';
import useDeviceSize from '@hooks/useDeviceSize';

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      if (location.pathname === '/') return;
      throw redirect({
        to: '/',
      });
    } else if (isAuthenticated() && location.pathname === '/') {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  component: () => <RootComponent />,
});

function RootComponent() {
  const queryClient = new QueryClient();
  const { isMobile } = useDeviceSize();
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ThemeProvider theme={lightTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {isMobile ? <MobileSideBar /> : <SideBar />}
            <Stack direction={'column'} width={'100%'}>
              <TopBar />
              <Box
                component={'main'}
                minHeight={'100vh'}
                width={'100%'}
                bgcolor={'#f5f7f9'}
              >
                <Outlet />
              </Box>
            </Stack>
          </Box>
          <AlertDialog />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
