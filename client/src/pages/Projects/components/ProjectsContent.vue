<template>
    <div class="projects__container">
      <Card
        v-bind:key="project.title"
        v-for="(project) in projects"
        v-bind:project='project'
        :title="project.title"
        body="project.categories[0].name"
        :image="`https://res.cloudinary.com/hcqy9e1vc/image/upload/v1604369233/projects/covers/project-${project.ID}.png`"
        @click="$router.push(Routes.PROJECTS_DETAIL.to(project.ID))"
      />
  </div>
</template>

<script>
import { API } from '../../../lib/network/API';
import Button from '../../../components/button/Button.vue';
import Card from '../../../components/card/Card.vue';
import { Routes } from '../../../router/routes/Routes';

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
      error: '',
      Routes
    }
  },
  created() {
    try {
      this.updateProjects();
    } catch (err) {
      this.error = err.message;
    }
  },
  watch: {
    category: function() {
      this.updateProjects();
    },
    technologies: function() {
      console.log('tech updated');
      this.updateProjects();
    }
  },
  methods: {
    updateProjects: function() {
      if (this.category) {
        let params = `category=${this.category}`;
        if (this.technologies.length) {
          const technologiesId = this.technologies.map(technology => technology.ID);
          params += `&technologies=${technologiesId.join(',')}`;
        }
        // API.projects.getFiltered(params).then(APIProjects => { console.log('API Projetcs: ', APIProjects); this.projects = APIProjects; })
        API.projects.getFiltered(params).then(APIProjects => { this.projects = APIProjects; })
      }
      else {
        // console.log('get all');
        API.projects.getAll().then(APIProjects => this.projects = APIProjects)
      }
    }
  }
}
</script>
