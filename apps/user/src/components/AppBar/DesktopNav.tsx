import { useEffect, useState } from 'react';

import Box from '@mui/system/Box';

import {
  AUTH_NAV_MENUS,
  NAV_MENUS,
  NavMenu,
} from '@constants/nav-menu.constant';
import { User } from '@packages/components/types/user';
import { Link } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { AnimatePresence } from 'framer-motion';

import NavItem from './NavItem';
import SubMenu from './SubMenu';

const currentTerm = getCurrentTerm();

interface DesktopNavProps {
  activeMenu: string | null;
  handleMouseEnter: (menuTitle: string) => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
  userState: User['state'];
}

export function DesktopNav({
  activeMenu,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
  userState,
}: DesktopNavProps) {
  const [selectedNavMenus, setSelectedNavMenus] = useState<NavMenu[]>([]);

  useEffect(() => {
    const navMenus = userState === 'sign-out' ? NAV_MENUS : AUTH_NAV_MENUS;
    setSelectedNavMenus(navMenus);
  }, [userState]);

  return (
    <>
      <Box
        sx={{ display: { xs: 'none', md: 'flex', zIndex: 999 } }}
        onMouseLeave={handleMouseLeave}
      >
        {selectedNavMenus.map((menu) => (
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
