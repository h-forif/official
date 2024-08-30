import { useMediaQuery, useTheme } from '@mui/material';

export default function useDeviceSize() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return { isDesktop, isTablet, isMobile };
}
