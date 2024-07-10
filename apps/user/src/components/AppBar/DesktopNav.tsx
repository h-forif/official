import Box from '@mui/system/Box';

import { Link } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';

import { NAV_MENUS } from '../../constants/nav-menu';
import { getCurrentTerm } from '../../utils/getCurrentTerm';
import NavItem from './NavItem';
import SubMenu from './SubMenu';

const currentTerm = getCurrentTerm();

interface DesktopNavProps {
  activeMenu: string | null;
  handleMouseEnter: (menuTitle: string) => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
}

export function DesktopNav({
  activeMenu,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
}: DesktopNavProps) {
  return (
    <>
      <Box
        sx={{ display: { xs: 'none', md: 'flex' } }}
        onMouseLeave={handleMouseLeave}
      >
        {NAV_MENUS.map((menu) => (
          <Box
            key={`${menu.title} - ${menu.href}`}
            onMouseEnter={() => handleMouseEnter(menu.title)}
            onClick={handleClick}
          >
            {menu.href === '/studies' ? (
              <Link
                to={menu.href}
                search={{
                  year: Number(currentTerm.year),
                  semester: Number(currentTerm.semester),
                  level: '전체',
                }}
              >
                <NavItem>{menu.title}</NavItem>
              </Link>
            ) : (
              <Link to={menu.href}>
                <NavItem>{menu.title}</NavItem>
              </Link>
            )}
            <AnimatePresence>
              {activeMenu === menu.title && menu.submenu && (
                <SubMenu items={menu.submenu} />
              )}
            </AnimatePresence>
          </Box>
        ))}
      </Box>
    </>
  );
}
