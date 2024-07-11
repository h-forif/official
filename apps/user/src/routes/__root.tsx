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
import ErrorPage from '@components/Error';

export const Route = createRootRoute({
  component: () => <RootComponent />,
  notFoundComponent: () => <ErrorPage />,
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

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <ErrorPage onClick={resetErrorBoundary} />
            )}
          >
            <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
              <CssBaseline />
              <AppBar mode={mode} toggleColorMode={toggleColorMode} />
              <div style={{ marginTop: 64 }}>
                <Outlet />
              </div>
              <TanStackRouterDevtools />
            </ThemeProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
