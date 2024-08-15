import { ReactNode } from 'react';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MoneyIcon from '@mui/icons-material/Money';

export interface NavMenu {
  title: string;
  href: string;
  icon?: ReactNode;
  submenu?: NavMenu[];
}

export const NAV_MENUS: NavMenu[] = [
  {
    title: '스터디',
    href: '/studies',
    icon: <BookmarkBorderIcon />,
    submenu: [
      { title: '스터디 목록', href: '/studies' },
      { title: '스터디 관리', href: '/studies/approve' },
    ],
  },
];

export const MENTOR_NAV_MENUS: NavMenu[] = [
  ...NAV_MENUS,
  {
    title: '프로필',
    href: '/profile',
    submenu: [
      { title: '계정', href: '/profile/account' },
      {
        title: '스터디',
        href: '/profile/study',
      },
      {
        title: '지원서',
        href: '/profile/application',
      },
      {
        title: '인증서',
        href: '/profile/certificate',
      },
    ],
  },
];

export const ADMIN_NAV_MENUS: NavMenu[] = [
  ...NAV_MENUS,
  {
    title: '회비',
    href: '/subscription',
    icon: <MoneyIcon />,
    submenu: [
      { title: '회비 내역', href: '/subscription' },
      { title: '회비 관리', href: '/subscription/manage' },
    ],
  },
  {
    title: '부원 관리',
    href: '/members',
    icon: <GroupOutlinedIcon />,
    submenu: [
      { title: '부원 목록', href: '/members' },
      { title: '부원 관리', href: '/members/manage' },
    ],
  },
];

export const MENTOR_ADMIN_NAV_MENUS: NavMenu[] = [
  ...MENTOR_NAV_MENUS,
  ...ADMIN_NAV_MENUS,
];
