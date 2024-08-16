export interface NavMenu {
  title: string;
  href: string;
  submenu?: NavMenu[];
}

export const NAV_MENUS: NavMenu[] = [
  {
    title: 'FORIF',
    href: '/club/about',
    submenu: [
      { title: '포리프', href: '/club/about' },
      { title: '포리프 팀', href: '/club/team' },
      {
        title: '캘린더',
        href: '/club/calendar',
      },
      {
        title: '회계 공시',
        href: '/club/finance',
      },
      {
        title: '회칙',
        href: '/club/rule',
      },
    ],
  },
  {
    title: '스터디',
    href: '/studies',
    submenu: [
      { title: '스터디 목록', href: '/studies' },
      { title: '스터디 지원', href: '/apply/member' },
      { title: '스터디 개설', href: '/apply/mentor' },
      { title: '스터디 가이드', href: '/studies/guide' },
    ],
  },
  {
    title: '공지사항',
    href: '/announcement',
  },
  {
    title: '자주 묻는 질문',
    href: '/faq',
  },
];

export const AUTH_NAV_MENUS: NavMenu[] = [
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

export const PROFILE_NAV_MENUS: NavMenu[] = [
  {
    title: '홈',
    href: '/profile',
  },
  {
    title: '계정',
    href: '/profile/account',
  },
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
];
