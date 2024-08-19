import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactGA from 'react-ga4';

import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/system/ThemeProvider';
import useMediaQuery from '@mui/system/useMediaQuery';

import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import { PaletteMode } from '@packages/components/PaletteMode';
import { darkTheme, lightTheme } from '@packages/components/theme.ts';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';

import AppBar from '@components/AppBar/AppBar';
import NotFoundPage from '@components/NotFound';
import { AlertDialog } from '@components/common/Dialog';
import Footer from '@components/common/Footer';
import Toast from '@components/common/Toast';

import useInitializeAuth from '@hooks/useInitializeAuth';

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

export const Route = createRootRoute({
  component: () => <RootComponent />,
  notFoundComponent: () => <NotFoundPage />,
});

function RootComponent() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(
    () =>
      (localStorage.getItem('mode') as PaletteMode) ||
      (prefersDarkMode ? 'dark' : 'light'),
  );

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const queryClient = new QueryClient();
  useInitializeAuth();
  ReactGA.initialize(GA4_MEASUREMENT_ID);

  useEffect(() => {
    ChannelService.loadScript();

    ChannelService.boot({
      pluginKey: import.meta.env.VITE_CHANNELTALK_PLUGIN_KEY,
    });

    return () => {
      ChannelService.shutdown();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <NotFoundPage onClick={resetErrorBoundary} />
            )}
          >
            <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
              <CssBaseline />
              <AppBar mode={mode} toggleColorMode={toggleColorMode} />
              <Box component={'main'} minHeight={'100vh'}>
                <Outlet />
              </Box>
              <Footer mode={mode} />
              <Toast />
              <AlertDialog />
            </ThemeProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
