import { ReactNode } from 'react';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CampaignIcon from '@mui/icons-material/Campaign';
import EmailIcon from '@mui/icons-material/Email';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MoneyIcon from '@mui/icons-material/Money';

export interface NavMenu {
  title: string;
  href?: string;
  icon?: ReactNode;
  submenu?: NavMenu[];
}

export const NAV_MENUS: NavMenu[] = [
  {
    title: '스터디',
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
    icon: <BookmarkBorderIcon />,
    submenu: [
      { title: '스터디 목록', href: '/studies' },
      { title: '스터디 승인', href: '/studies/approve' },
      { title: '내 스터디 관리', href: '/studies/me' },
      { title: '스터디 신청서 관리', href: '/studies/applications' },
      { title: '수강 승인', href: '/studies/accept' },
    ],
  },
  {
    title: '회계',
    icon: <MoneyIcon />,
    submenu: [
      { title: '회비 관리', href: '/subscription' },
      { title: '회계 자료', href: '/subscription/file' },
    ],
  },
  {
    title: '부원/회원',
    icon: <GroupOutlinedIcon />,
    submenu: [
      { title: '부원 관리', href: '/members' },
      { title: '회원 관리', href: '/subscriber' },
    ],
  },
  {
    title: '게시물',
    icon: <CampaignIcon />,
    submenu: [
      { title: '공지사항 관리', href: '/posts/announcements' },
      { title: 'FAQ 관리', href: '/posts/faqs' },
    ],
  },
  {
    title: '문자 발송 서비스',
    href: '/message',
    icon: <EmailIcon />,
    submenu: [
      { title: '문자 발송', href: '/message' },
      { title: '문자 발송 내역', href: '/message/status' },
    ],
  },
];
