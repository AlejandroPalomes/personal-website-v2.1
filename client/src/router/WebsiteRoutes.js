import notFound from '../components/notFound.vue';
import projectDetail from '../components/projectDetail.vue';
import Dashboard from '../components/mainComponent.vue'
import Projects from '../components/Projects.vue'
import { Routes } from './routes/Routes'

export const WebsiteRoutes = [{
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
