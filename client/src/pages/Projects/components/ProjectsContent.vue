<template>
    <div class="projects__container">
      <Card
        v-bind:key="project.title"
        v-for="(project) in projects"
        v-bind:project='project'
        :title="project.title"
        :body="this.category"
        :image="`https://res.cloudinary.com/hcqy9e1vc/image/upload/v1604369233/projects/covers/project-${project.ID}.png`"
        @click="$router.push(Routes.PROJECTS_DETAIL.to(project.ID))"
      />
  </div>
</template>

<script>
import { API } from '../../../lib/network/API';
import config from '../../../lib/Config.ts';
import Button from '../../../components/button/Button.vue';
import Card from '../../../components/card/Card.vue';
import { Routes } from '../../../router/routes/Routes';
// import CarouselComponent from './CarouselComponent.vue'

export default {
    name: 'ProjectsContent',
    components: {
        Card,
        Button
    },
    props: ['category', 'technologies'],
    data(){
        return {
        projects: [],
        categories: [],
        error: '',
        selectedCategory: this.$route.query.category,
        Routes
        }
    },
    created() {
        try {
            API.projects.getAll().then(APIProjects => this.projects = APIProjects).then(e => console.log(e));
        } catch (err) {
          this.error = err.message;
        }
    }
}
</script>
