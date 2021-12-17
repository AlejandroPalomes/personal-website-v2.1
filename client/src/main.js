import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/styles.css';

// AppConfig.productionTip = false;

// // new Vue({
// //   render: h => h(App),
// // }).$mount('#app')

// const app = createApp({
//   render: h => h(App),
// });

// app.config.compilerOptions

// app.mount('#app')

const Counter = {
  data() {
    return {
      counter: '0'
    }
  }
}

createApp(Counter).mount('#app')