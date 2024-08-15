import { Box, BoxProps } from '@mui/material';

export function Layout({ children, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={{ paddingX: { xs: 4, sm: 8, md: 12 }, pb: 4, margin: 'auto' }}
    >
      {children}
    </Box>
  );
}
