<template>
  <div id="app" class="main d-flex flex-column justify-content-between">
    <Header v-if="$route.path ==='/' ? false : true"/>
    <div class="d-flex flex-grow-1 justify-content-center align-items-center">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import mainComponent from './components/mainComponent.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    mainComponent,
    Footer,
    Header
  }
}
</script>