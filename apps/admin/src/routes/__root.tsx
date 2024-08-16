import { useEffect } from 'react';

import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/system/ThemeProvider';

import { lightTheme } from '@packages/components/theme.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getUser } from '@stores/user.store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router';

import SideBar from '@components/SideBar/SideBar';
import { AlertDialog } from '@components/common/Dialog';

export const Route = createRootRoute({
  component: () => <RootComponent />,
});

function RootComponent() {
  const location = useLocation();
  const queryClient = new QueryClient();
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;

  useEffect(() => {
    async function getAuthenticate() {
      const user = getUser();

      const pathname = location.pathname;
      if (!user.id && pathname !== '/') {
        window.location.href = '/';
      }
    }
    getAuthenticate();
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ThemeProvider theme={lightTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <SideBar />
            <Box component={'main'} minHeight={'100vh'} width={'100%'}>
              <Outlet />
            </Box>
          </Box>
          <AlertDialog />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
