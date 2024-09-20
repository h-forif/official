import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import styled from '@mui/system/styled';

interface NavItemProps {
  children: React.ReactNode;
  label: string;
}

export default function NavItem({ children, label }: NavItemProps) {
  return (
    <NavItemWrapper sx={{ my: 2 }}>
      <MenuItem
        sx={{ py: 1, px: 2, borderRadius: 1 }}
        role='navigation'
        aria-label={label}
      >
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

const NavItemWrapper = styled('div')({
  position: 'relative',
  display: 'block',
  width: 'fit-content',
  margin: '8px 0',
});
