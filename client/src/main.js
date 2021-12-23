import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
// import routes from './routes/routes.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/styles.css';

// Vue.config.productionTip = false;
// Vue.use(Router);

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// let router = new Router({
//   mode: 'history',
//   routes
// });
app.use(router);
const app = createApp(App);

app.mount('#app');
