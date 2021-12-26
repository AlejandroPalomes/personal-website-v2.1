<template>
  <div class="header position-fixed d-flex justify-content-between align-items-center">
    <!-- <span>ALEJANDRO PALOMES</span> -->
    <router-link to="/">ALEJANDRO PALOMES</router-link>
    <ul class="d-flex">
      <li><router-link :to="Routes.PROJECTS.path">PORTFOLIO</router-link></li>
      <li><router-link to="/about">ABOUT ME</router-link></li>
      <li><router-link to="/contact">CONTACT</router-link></li>
    </ul>
  </div>
</template>

<script>
  import { Routes } from '../router/routes/Routes'

  export default {
      name: 'Header',
      data() {
        return {
          Routes
        }
      }
      // props: ['project'],
  }
</script>
