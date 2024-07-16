import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/system/ThemeProvider';
import useMediaQuery from '@mui/system/useMediaQuery';

import { PaletteMode } from '@packages/components/PaletteMode';
import { darkTheme, lightTheme } from '@packages/components/theme.ts';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import AppBar from '@components/AppBar/AppBar';
import NotFoundPage from '@components/NotFound';
import Toast from '@components/common/Toast';

import useInitializeGoogleOAuth from '@hooks/useInitializeOAuth';

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
  useInitializeGoogleOAuth();

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
              <Outlet />
              <Toast />
              <TanStackRouterDevtools />
            </ThemeProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
