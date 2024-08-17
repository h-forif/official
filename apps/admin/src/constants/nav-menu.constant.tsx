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
      { title: '내 스터디 관리', href: '/studies/me' },
      { title: '수강 승인', href: '/studies/accept' },
    ],
  },
];

export const ADMIN_NAV_MENUS: NavMenu[] = [
  {
    title: '스터디',
    href: '/studies',
    icon: <BookmarkBorderIcon />,
    submenu: [
      { title: '스터디 목록', href: '/studies' },
      { title: '스터디 승인', href: '/studies/approve' },
      { title: '내 스터디 관리', href: '/studies/me' },
      { title: '수강 승인', href: '/studies/accept' },
    ],
  },
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
