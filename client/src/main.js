import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { WebsiteRoutes } from './router/WebsiteRoutes';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/styles.css';

// Vue.config.productionTip = false;
// Vue.config.devtools = true;
// Vue.use(Router);
// Vue.config.productionTip = false;
// Vue.use(Router);

const router = createRouter({
  history: createWebHashHistory(),
  routes: WebsiteRoutes
});

const app = createApp(App);

app.use(router);

app.mount('#app');
