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
      <MenuItem sx={{ py: '8px', px: '12px' }}>
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
  '& > *': {
    display: 'block',
    padding: '4px 0',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '3px',
    bottom: '-2px',
    left: '0',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.2s ease',
  },
  '&:hover::after': {
    width: '100%',
  },
}));
