import { BaseRoute } from "./types";

const RoutesIdentifiers = <const>[
  'ABOUT',
  'CONTACT',
  'DASHBOARD',
  'PROJECTS',
  'PROJECTS_DETAIL'
];

type PrivateRoutesType = typeof RoutesIdentifiers[number];
type RouteDefinition = {
  [key in PrivateRoutesType]: BaseRoute;
}

export const Routes: RouteDefinition = {
  ABOUT: {
    path: '/about'
  },
  CONTACT: {
    path: '/contact'
  },
  DASHBOARD: {
    path: '/'
  },
  PROJECTS: {
    path: '/projects'
  },
  PROJECTS_DETAIL: {
    path: '/projects/:projectId',
    to: (projectId: string) => `/projects/${projectId}`
  }
};
