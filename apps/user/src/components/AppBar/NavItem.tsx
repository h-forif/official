import React from 'react';

import Typography from '@mui/material/Typography';
import styled from '@mui/system/styled';

import { MenuItem } from '@packages/components/MenuItem';

interface NavItemProps {
  children: React.ReactNode;
}

export default function NavItem({ children }: NavItemProps) {
  return (
    <NavItemWrapper sx={{ my: 2 }}>
      <MenuItem sx={{ py: 1, px: 2, borderRadius: 1 }}>
        <Typography
          component={'span'}
          variant='bodySmall'
          color='text.primary'
          fontWeight={500}
        >
          {children}
        </Typography>
      </MenuItem>
    </NavItemWrapper>
  );
}

const NavItemWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'block',
  width: 'fit-content',
  margin: '8px 0',
}));
