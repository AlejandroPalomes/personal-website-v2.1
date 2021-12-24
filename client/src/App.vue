<template>
  <div id="app" class="main d-flex flex-column justify-content-between">
    <!-- <Header v-if="$route.path ==='/' ? false : true"/> -->
    <Header/>
    <div class="d-flex flex-grow-1 pt-5 justify-content-center">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Footer,
    Header
  }
}
</script>
