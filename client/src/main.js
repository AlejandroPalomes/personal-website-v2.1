import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/styles.css';

const app = createApp({
  render: h => h(App),
});

app.mount('#app');