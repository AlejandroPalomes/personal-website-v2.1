<template>
  <div class="header position-fixed d-flex justify-content-between align-items-center">
    <router-link :to="Routes.DASHBOARD.path" class="link">ALEJANDRO PALOMES</router-link>
    <ul class="d-flex">
      <li><router-link :to="Routes.DASHBOARD.path" class="link">DASHBOARD</router-link></li>
      <li><router-link :to="Routes.PROJECTS.path" class="link">PORTFOLIO</router-link></li>
      <li><router-link :to="Routes.ABOUT.path" class="link">ABOUT ME</router-link></li>
      <li><router-link :to="Routes.CONTACT.path" class="link">CONTACT</router-link></li>
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
