import { createApp } from 'vue';
import App from './App.vue';
// import Router from 'vue-router';
// import routes from './routes/routes.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/styles.css';

// Vue.config.productionTip = false;
// Vue.use(Router);

// let router = new Router({
//   mode: 'history',
//   routes
// });

const app = createApp(App);

app.mount('#app');
