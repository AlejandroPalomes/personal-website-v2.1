import { BaseRoute } from "./types";

const RoutesIdentifiers = <const>[
  'DASHBOARD',
  'PROJECTS',
  'PROJECTS_DETAIL'
];

type PrivateRoutesType = typeof RoutesIdentifiers[number];
type RouteDefinition = {
  [key in PrivateRoutesType]: BaseRoute;
}

export const Routes: RouteDefinition = {
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
