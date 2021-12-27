import NotFound from '../pages/NotFound/NotFound.page.vue';
import ProjectDetail from '../pages/Projects/ProjectsDetail.page.vue';
import About from '../pages/About/About.page.vue'
import Contact from '../pages/Contact/Contact.page.vue'
import Dashboard from '../pages/Dashboard/Dashboard.page.vue'
import Projects from '../pages/Projects/Projects.page.vue'
import { Routes } from './routes/Routes'

export const WebsiteRoutes = [
  {
    path: Routes.ABOUT.path,
    name: 'About',
    component: About
  },
  {
    path: Routes.CONTACT.path,
    name: 'Contact',
    component: Contact
  },
  {
    path: Routes.DASHBOARD.path,
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: Routes.PROJECTS.path,
    component: Projects,
    props: true
  },
  {
    path: Routes.PROJECTS_DETAIL.path,
    component: ProjectDetail,
    props: true
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];
