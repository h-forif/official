import React from 'react';

import { Global, ThemeProvider, css } from '@emotion/react';
import { Decorator } from '@storybook/react';

import { darkTheme, lightTheme } from '../theme';

const globalStyles = css`
  body {
    font-family:
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
  }
`;

const previewDecorator: Decorator = (Story, context) => {
  const { mode } = context.globals;

  const theme = React.useMemo(() => {
    switch (mode) {
      case 'light':
        return lightTheme;

      case 'dark':
        return darkTheme;

      default:
        return lightTheme;
    }
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Story {...context} />
    </ThemeProvider>
  );
};

export default [previewDecorator];
