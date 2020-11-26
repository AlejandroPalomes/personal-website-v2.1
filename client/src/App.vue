<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import mainComponent from './components/mainComponent.vue'

export default {
  name: 'App',
  components: {
    mainComponent
  }
}
</script>