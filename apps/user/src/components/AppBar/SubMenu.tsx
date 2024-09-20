import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/system';

import { Link } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { motion } from 'framer-motion';

import { SubMenuItem } from '../../types/app-bar.type';

interface SubMenuProps {
  items: SubMenuItem[];
}

const currentTerm = getCurrentTerm();

export default function SubMenu({ items }: SubMenuProps) {
  const theme = useTheme();
  const backgroundColor = theme.palette.mode === 'light' ? 'white' : 'black';

  const columns = Math.ceil(items.length / 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 1,
        backgroundColor: backgroundColor,
        borderRadius: '4px',
        width: '100%',
        padding: '50px 18.7% 55px',
        boxShadow:
          theme.palette.mode === 'light'
            ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
            : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, auto)`,
      }}
    >
      {items.map((subItem) => (
        <SubMenuWrapper key={subItem.title}>
          {subItem.href === '/studies' ? (
            <Link
              to={subItem.href}
              search={{
                year: Number(currentTerm.year),
                semester: Number(currentTerm.semester),
              }}
              role='navigation'
              aria-label='Go to studies page'
            >
              <Typography variant='titleLarge' color='text.primary'>
                {subItem.title}
              </Typography>
            </Link>
          ) : (
            <Link
              to={subItem.href}
              role='navigation'
              aria-label={`Go to ${subItem.title} page`}
            >
              <Typography variant='titleLarge' color='text.primary'>
                {subItem.title}
              </Typography>
            </Link>
          )}
          <Link role='navigation' to={subItem.href}></Link>
        </SubMenuWrapper>
      ))}
    </motion.div>
  );
}

const SubMenuWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'block',
  width: 'fit-content',
  margin: '12px 0',
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
