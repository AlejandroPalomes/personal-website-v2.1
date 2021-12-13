import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import routes from './routes/routes.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/styles.css';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});