import { useEffect, useState } from 'react';

import {
  ADMIN_NAV_MENUS,
  NAV_MENUS,
  NavMenu,
} from '@constants/nav-menu.constant';
import { getUser } from '@stores/user.store';

export default function useNavMenu() {
  const user = getUser();
  const [menus, setMenus] = useState<NavMenu[] | null>(NAV_MENUS);

  useEffect(() => {
    if (!user) {
      setMenus(null);
    } else {
      if (user.auth_level! >= 3) {
        setMenus(ADMIN_NAV_MENUS);
      } else {
        setMenus(NAV_MENUS);
      }
    }
  }, [user]);
  return { menus };
}
