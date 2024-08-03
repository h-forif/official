import { ReactNode } from 'react';

import { Box } from '@mui/material';

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <Box sx={{ paddingX: { xs: 4, sm: 8, md: 12 }, pb: 4, margin: 'auto' }}>
      {children}
    </Box>
  );
}
