/* eslint-disable no-unused-vars */
import { orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
  interface TypographyVariants {
    // 기본 타입 스케일에는 Large, Medium, Small의 세 가지 디스플레이 스타일이 있어요.
    /*
    화면에서 가장 큰 텍스트인 디스플레이 스타일은 짧고 중요한 텍스트나 숫자에 사용해요.
    큰 화면에서 가장 효과적이에요. 디스플레이 타입을 사용할 때는 손글씨나 스크립트 스타일 같은 표현력 있는 폰트를 고려하세요.
    */
    displayLarge: TypographyStyleOptions;
    displayMedium: TypographyStyleOptions;
    displaySmall: TypographyStyleOptions;
    /*
    헤드라인은 작은 화면에서 짧고, 강조된 텍스트에 적합해요.
    주요 텍스트 구절이나 중요한 내용 영역을 표시하는 데 유용해요.
    */
    headlineLarge: TypographyStyleOptions;
    headlineMedium: TypographyStyleOptions;
    headlineSmall: TypographyStyleOptions;
    /*
    타이틀은 헤드라인 스타일보다 작으며, 비교적 짧은 중간 강조 텍스트에 사용해야 해요.
    예를 들어, 부차적인 텍스트나 내용의 영역을 나누는 데 타이틀 스타일을 고려해보세요
    */
    titleLarge: TypographyStyleOptions;
    titleMedium: TypographyStyleOptions;
    titleSmall: TypographyStyleOptions;
    /*
    바디 스타일은 앱에서 긴 텍스트에 사용해요. 작은 글씨와 긴 구절에도 잘 읽을 수 있는 폰트를 사용해주세요.
    */
    bodyLarge: TypographyStyleOptions;
    bodyMedium: TypographyStyleOptions;
    bodySmall: TypographyStyleOptions;
    /*
    레이블 스타일은 더 작고 실용적인 스타일로, 컴포넌트 내부의 텍스트나 매우 작은 텍스트에 사용해요.
    예를 들어 버튼은 labelLarge 스타일을 사용해요.
    */
    labelLarge: TypographyStyleOptions;
    labelMedium: TypographyStyleOptions;
    labelSmall: TypographyStyleOptions;
  }
  interface TypographyVariantsOptions {
    displayLarge?: TypographyStyleOptions;
    displayMedium?: TypographyStyleOptions;
    displaySmall?: TypographyStyleOptions;
    headlineLarge?: TypographyStyleOptions;
    headlineMedium?: TypographyStyleOptions;
    headlineSmall?: TypographyStyleOptions;
    titleLarge?: TypographyStyleOptions;
    titleMedium?: TypographyStyleOptions;
    titleSmall?: TypographyStyleOptions;
    bodyLarge?: TypographyStyleOptions;
    bodyMedium?: TypographyStyleOptions;
    bodySmall?: TypographyStyleOptions;
    labelLarge?: TypographyStyleOptions;
    labelMedium?: TypographyStyleOptions;
    labelSmall?: TypographyStyleOptions;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displayLarge: true;
    displayMedium: true;
    displaySmall: true;
    headlineLarge: true;
    headlineMedium: true;
    headlineSmall: true;
    titleLarge: true;
    titleMedium: true;
    titleSmall: true;
    bodyLarge: true;
    bodyMedium: true;
    bodySmall: true;
    labelLarge: true;
    labelMedium: true;
    labelSmall: true;
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    body1: false;
    body2: false;
    button: false;
    overline: false;
    subtitle1: false;
    subtitle2: false;
    inherit: false;
    caption: false;
  }
}

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // 라이트 모드 팔레트
          primary: {
            main: '#1D40BA',
          },
          secondary: {
            main: '#8BA6BA',
          },
          error: {
            main: '#DC0000',
          },
          info: {
            main: '#1D2475',
          },
          background: {
            default: '#FFFFFF',
            paper: '#F5F5F5',
          },
        }
      : {
          // 다크 모드 팔레트
          primary: {
            main: '#F8FAFC',
          },
          secondary: {
            main: '#0F172A',
          },
          error: {
            main: '#FF8A80',
          },
          info: {
            main: '#4051AC',
          },
          background: {
            default: '#09090b',
            paper: '#1E1E1E',
          },
        }),
  },
  typography: {
    fontFamily: [
      'Pretendard Variable',
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      'system-ui',
      'Roboto',
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'sans-serif',
    ].join(','),
    displayLarge: {
      fontSize: '57pt',
      lineHeight: '64pt',
      letterSpacing: '-0.25pt',
    },
    displayMedium: {
      fontSize: '45pt',
      lineHeight: '52pt',
    },
    displaySmall: {
      fontSize: '36pt',
      lineHeight: '44pt',
    },
    headlineLarge: {
      fontSize: '32pt',
      lineHeight: '40pt',
    },
    headlineMedium: {
      fontSize: '28pt',
      lineHeight: '36pt',
    },
    headlineSmall: {
      fontSize: '36pt',
      lineHeight: '44pt',
    },
    titleLarge: {
      fontSize: '22pt',
      lineHeight: '28pt',
    },
    titleMedium: {
      fontSize: '16pt',
      lineHeight: '24pt',
      fontWeight: 500,
      letterSpacing: '0.15pt',
    },
    titleSmall: {
      fontSize: '14pt',
      lineHeight: '20pt',
      fontWeight: 500,
      letterSpacing: '0.1pt',
    },
    bodyLarge: {
      fontSize: '16pt',
      lineHeight: '24pt',
      letterSpacing: '0.5pt',
    },
    bodyMedium: {
      fontSize: '14pt',
      lineHeight: '20pt',
      letterSpacing: '0.25pt',
    },
    bodySmall: {
      fontSize: '12pt',
      lineHeight: '16pt',
      letterSpacing: '0.4pt',
    },
    labelLarge: {
      fontSize: '14pt',
      lineHeight: '20pt',
      fontWeight: 500,
      letterSpacing: '0.1pt',
    },
    labelMedium: {
      fontSize: '12pt',
      lineHeight: '16pt',
      fontWeight: 500,
      letterSpacing: '0.5pt',
    },
    labelSmall: {
      fontSize: '11pt',
      lineHeight: '16pt',
      fontWeight: 500,
      letterSpacing: '0.5pt',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          displayLarge: 'h1',
          displayMedium: 'h2',
          displaySmall: 'h3',
          headlineLarge: 'h4',
          headlineMedium: 'h5',
          headlineSmall: 'h6',
          titleLarge: 'h2',
          titleMedium: 'h3',
          titleSmall: 'h4',
          bodyLarge: 'p',
          bodyMedium: 'p',
          bodySmall: 'p',
          labelLarge: 'span',
          labelMedium: 'span',
          labelSmall: 'span',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: 'red' },
      },
    },
  },
  status: {
    danger: orange[500],
  },
});

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));
