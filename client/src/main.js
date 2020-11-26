import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import router from './routes/routes.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/styles.css';

Vue.config.productionTip = false;
Vue.use(Router);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
//.$mount('#app')
