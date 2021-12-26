<template>
<div>
    HERE WILL GO A LIST OF PROJECTS
</div>
</template>

<script>
import { API } from '../lib/network/API';
import config from '../lib/Config.ts'
// import CarouselComponent from './CarouselComponent.vue'

export default {
    name: 'Projects',
    // props: ['id'],
    components: {
        // CarouselComponent,
    },
    data(){
        return {
        projects: [],
        error: ''
        }
    },
    created() {
        try {
            // API.projects.getById(this.id).then(APIProject => this.project = APIProject);
            API.projects.getAll().then(APIProjects => this.projects = APIProjects)
        } catch (err) {
            this.error = err.message;
        }
    },
}
</script>
