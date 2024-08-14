import { useEffect, useState } from 'react';

import Box from '@mui/system/Box';

import {
  ADMIN_NAV_MENUS,
  MENTOR_NAV_MENUS,
  NAV_MENUS,
  NavMenu,
} from '@constants/nav-menu.constant';
import { User } from '@packages/components/types/user';
import { Link } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';

import NavItem from './NavItem';
import SubMenu from './SubMenu';

interface DesktopNavProps {
  activeMenu: string | null;
  handleMouseEnter: (menuTitle: string) => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
  authLevel: User['auth_level'];
  userState: User['state'];
}

export function DesktopNav({
  activeMenu,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
  authLevel,
  userState,
}: DesktopNavProps) {
  const [selectedNavMenus, setSelectedNavMenus] = useState<NavMenu[]>([]);

  useEffect(() => {
    if (userState === 'sign-in' && authLevel) {
      // TODO: 관리자만의 메뉴 추가
      if (authLevel >= 3) {
        setSelectedNavMenus(ADMIN_NAV_MENUS);
      } else if (authLevel === 2) {
        setSelectedNavMenus(MENTOR_NAV_MENUS);
      }
    } else {
      setSelectedNavMenus(NAV_MENUS);
    }
  }, [authLevel, userState]);

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
            <Link to={menu.href}>
              <NavItem>{menu.title}</NavItem>
            </Link>
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
