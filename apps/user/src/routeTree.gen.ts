/* prettier-ignore-start */

/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// This file is auto-generated by TanStack Router
import { createFileRoute } from '@tanstack/react-router';

// Import Routes
import { Route as rootRoute } from './routes/__root';
import { Route as LayoutImport } from './routes/_layout';
import { Route as LayoutProfileAccountImport } from './routes/_layout/profile/account';
import { Route as LayoutProfileStudyImport } from './routes/_layout/profile/study';
import { Route as ApplyMemberImport } from './routes/apply/member';
import { Route as ApplyMentorImport } from './routes/apply/mentor';
import { Route as AuthSignUpImport } from './routes/auth/sign-up';
import { Route as ClubAboutImport } from './routes/club/about';
import { Route as StudiesStudyIdImport } from './routes/studies/$studyId';

// Create Virtual Routes

const TeamLazyImport = createFileRoute('/team')();
const AboutLazyImport = createFileRoute('/about')();
const IndexLazyImport = createFileRoute('/')();
const StudiesIndexLazyImport = createFileRoute('/studies/')();
const ClubTeamLazyImport = createFileRoute('/club/team')();
const LayoutProfileIndexLazyImport = createFileRoute('/_layout/profile/')();
const LayoutProfileCertificateLazyImport = createFileRoute(
  '/_layout/profile/certificate',
)();

// Create/Update Routes

const TeamLazyRoute = TeamLazyImport.update({
  path: '/team',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/team.lazy').then((d) => d.Route));

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route));

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any);

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route));

const StudiesIndexRoute = StudiesIndexImport.update({
  path: '/studies/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/studies/index.lazy').then((d) => d.Route),
);

const ClubTeamLazyRoute = ClubTeamLazyImport.update({
  path: '/club/team',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/club/team.lazy').then((d) => d.Route));

const StudiesStudyIdRoute = StudiesStudyIdImport.update({
  path: '/studies/$studyId',
  getParentRoute: () => rootRoute,
} as any);

const ClubAboutRoute = ClubAboutImport.update({
  path: '/club/about',
  getParentRoute: () => rootRoute,
} as any);

const AuthSignUpRoute = AuthSignUpImport.update({
  path: '/auth/sign-up',
  getParentRoute: () => rootRoute,
} as any);

const ApplyMentorRoute = ApplyMentorImport.update({
  path: '/apply/mentor',
  getParentRoute: () => rootRoute,
} as any);

const ApplyMemberRoute = ApplyMemberImport.update({
  path: '/apply/member',
  getParentRoute: () => rootRoute,
} as any);

const LayoutProfileIndexLazyRoute = LayoutProfileIndexLazyImport.update({
  path: '/profile/',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/profile/index.lazy').then((d) => d.Route),
);

const LayoutProfileCertificateLazyRoute =
  LayoutProfileCertificateLazyImport.update({
    path: '/profile/certificate',
    getParentRoute: () => LayoutRoute,
  } as any).lazy(() =>
    import('./routes/_layout/profile/certificate.lazy').then((d) => d.Route),
  );

const LayoutProfileStudyRoute = LayoutProfileStudyImport.update({
  path: '/profile/study',
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutProfileAccountRoute = LayoutProfileAccountImport.update({
  path: '/profile/account',
  getParentRoute: () => LayoutRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/_layout': {
      id: '/_layout';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof LayoutImport;
      parentRoute: typeof rootRoute;
    };
    '/about': {
      id: '/about';
      path: '/about';
      fullPath: '/about';
      preLoaderRoute: typeof AboutLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/team': {
      id: '/team';
      path: '/team';
      fullPath: '/team';
      preLoaderRoute: typeof TeamLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/apply/member': {
      id: '/apply/member';
      path: '/apply/member';
      fullPath: '/apply/member';
      preLoaderRoute: typeof ApplyMemberImport;
      parentRoute: typeof rootRoute;
    };
    '/apply/mentor': {
      id: '/apply/mentor';
      path: '/apply/mentor';
      fullPath: '/apply/mentor';
      preLoaderRoute: typeof ApplyMentorImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/sign-up': {
      id: '/auth/sign-up';
      path: '/auth/sign-up';
      fullPath: '/auth/sign-up';
      preLoaderRoute: typeof AuthSignUpImport;
      parentRoute: typeof rootRoute;
    };
    '/club/about': {
      id: '/club/about';
      path: '/club/about';
      fullPath: '/club/about';
      preLoaderRoute: typeof ClubAboutImport;
      parentRoute: typeof rootRoute;
    };
    '/studies/$studyId': {
      id: '/studies/$studyId';
      path: '/studies/$studyId';
      fullPath: '/studies/$studyId';
      preLoaderRoute: typeof StudiesStudyIdImport;
      parentRoute: typeof rootRoute;
    };
    '/club/team': {
      id: '/club/team';
      path: '/club/team';
      fullPath: '/club/team';
      preLoaderRoute: typeof ClubTeamLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/studies/': {
      id: '/studies/';
      path: '/studies';
      fullPath: '/studies';
      preLoaderRoute: typeof StudiesIndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/_layout/profile/account': {
      id: '/_layout/profile/account';
      path: '/profile/account';
      fullPath: '/profile/account';
      preLoaderRoute: typeof LayoutProfileAccountImport;
      parentRoute: typeof LayoutImport;
    };
    '/_layout/profile/study': {
      id: '/_layout/profile/study';
      path: '/profile/study';
      fullPath: '/profile/study';
      preLoaderRoute: typeof LayoutProfileStudyImport;
      parentRoute: typeof LayoutImport;
    };
    '/_layout/profile/certificate': {
      id: '/_layout/profile/certificate';
      path: '/profile/certificate';
      fullPath: '/profile/certificate';
      preLoaderRoute: typeof LayoutProfileCertificateLazyImport;
      parentRoute: typeof LayoutImport;
    };
    '/_layout/profile/': {
      id: '/_layout/profile/';
      path: '/profile';
      fullPath: '/profile';
      preLoaderRoute: typeof LayoutProfileIndexLazyImport;
      parentRoute: typeof LayoutImport;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  LayoutRoute: LayoutRoute.addChildren({
    LayoutProfileAccountRoute,
    LayoutProfileStudyRoute,
    LayoutProfileCertificateLazyRoute,
    LayoutProfileIndexLazyRoute,
  }),
  AboutLazyRoute,
  TeamLazyRoute,
  ApplyMemberRoute,
  ApplyMentorRoute,
  AuthSignUpRoute,
  ClubAboutRoute,
  StudiesStudyIdRoute,
  ClubTeamLazyRoute,
  StudiesIndexLazyRoute,
});

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_layout",
        "/about",
        "/team",
        "/apply/member",
        "/apply/mentor",
        "/auth/sign-up",
        "/club/about",
        "/studies/$studyId",
        "/club/team",
        "/studies/",
        "/hackathon/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/profile/account",
        "/_layout/profile/study",
        "/_layout/profile/certificate",
        "/_layout/profile/"
      ]
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/team": {
      "filePath": "team.lazy.tsx"
    },
    "/apply/member": {
      "filePath": "apply/member.tsx"
    },
    "/apply/mentor": {
      "filePath": "apply/mentor.tsx"
    },
    "/auth/sign-up": {
      "filePath": "auth/sign-up.tsx"
    },
    "/club/about": {
      "filePath": "club/about.tsx"
    },
    "/studies/$studyId": {
      "filePath": "studies/$studyId.tsx"
    },
    "/club/team": {
      "filePath": "club/team.lazy.tsx"
    },
    "/studies/": {
      "filePath": "studies/index.tsx"
    },
    "/_layout/profile/account": {
      "filePath": "_layout/profile/account.tsx",
      "parent": "/_layout"
    },
    "/_layout/profile/study": {
      "filePath": "_layout/profile/study.tsx",
      "parent": "/_layout"
    },
    "/_layout/profile/certificate": {
      "filePath": "_layout/profile/certificate.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/profile/": {
      "filePath": "_layout/profile/index.lazy.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
