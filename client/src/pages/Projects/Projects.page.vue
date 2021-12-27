<template>
<div>
  <div class="projects__filters"/>
  <div class="projects__container">
    <Card
      v-bind:key="project.title"
      v-for="(project) in projects"
      v-bind:project='project'
      :title="project.title"
      :image="`https://res.cloudinary.com/hcqy9e1vc/image/upload/v1604369233/projects/covers/project-${project.ID}.png`"
      @click="$router.push(Routes.PROJECTS_DETAIL.to(project.ID))"
    />
  </div>
</div>
</template>

<script>
import { API } from '../../lib/network/API';
import config from '../../lib/Config.ts';
import Card from '../../components/card/Card.vue';
import { Routes } from '../../router/routes/Routes';
// import CarouselComponent from './CarouselComponent.vue'

export default {
    name: 'Projects',
    components: {
        Card,
    },
    data(){
        return {
        projects: [],
        categories: [],
        error: '',
        Routes
        }
    },
    created() {
        try {
            API.categories.getAll().then(APICategories => this.categories = APICategories).then(e => console.log(e))
            API.projects.getAll().then(APIProjects => this.projects = APIProjects).then(e => console.log(e))
        } catch (err) {
            this.error = err.message;
        }
    },
}
</script>
