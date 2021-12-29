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

//TODO Move this and the types to the corresponding models folder, when that architecture is ready
const ProjectCategories = <const>[
  'Dev',
  'Photo',
  'Video',
  'Design'
];
type ProjectCategoriesType = typeof ProjectCategories[number];

const Technologies = <const>[
  'Axios',
  'Bootstrap',
  'Composer',
  'CSS',
  'EJS',
  'Express',
  'Git',
  'HATEOAS',
  'HTML',
  'JavaScript',
  'Jest',
  'jQuery',
  'Laravel',
  'MVC',
  'MySQL',
  'Node.js',
  'NPM',
  'OOP',
  'PHP',
  'Postman',
  'Pug',
  'React',
  'REST',
  'SASS',
  'Sequelize',
  'Styled Components',
  'Typescript',
  'Vue.js',
  'Webpack'
];
type TechnologiesType = typeof Technologies[number];

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
    path: '/projects',
    withParams: (category?: ProjectCategoriesType, techs?: TechnologiesType[]): string => {
      if (!category && !techs) return '/projects';
      let queryParams = '/projects?';
      if(category) queryParams += `category=${category}`;
      if(techs) queryParams += `&technologies=${techs.join(',')}`;
      return queryParams;
    }
  },
  PROJECTS_DETAIL: {
    path: '/projects/:projectId',
    to: (projectId: string) => `/projects/${projectId}`
  }
};
