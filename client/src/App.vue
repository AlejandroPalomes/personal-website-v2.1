<template>
  <div id="app">
    <router-view/>
    <!-- <mainComponent/> -->
  </div>
</template>

<script>
import mainComponent from './components/mainComponent.vue'
// import router-view from './components/router-view.vue'

export default {
  name: 'App',
  components: {
    mainComponent

  }
}
</script>
