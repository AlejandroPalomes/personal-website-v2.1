import notFound from '../components/notFound.vue';
import projectDetail from '../components/projectDetail.vue';
import About from '../components/About/About.page.vue'
import Contact from '../components/Contact/Contact.page.vue'
import Dashboard from '../components/mainComponent.vue'
import Projects from '../components/Projects.vue'
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
    component: projectDetail,
    props: true
  },
  {
    path: "/:catchAll(.*)",
    component: notFound,
  },
];
