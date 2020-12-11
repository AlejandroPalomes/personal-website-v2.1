<template>
<div class="h-100 border border-blue">
    <div class="mx-5">
        <h4>{{ project.title }}</h4>
        <p>DESCRIPTION: {{ project.description }}</p>
        <p>COLLAB: {{ project.collaborators }}</p>
        <p>COMPLETED: {{ project.completion_date }}</p>
        <p>REPO: {{ project.repo }}</p>
        <p>PREVIEW: {{ project.preview }}</p>
        <p>TECH: {{ project.technologies }}</p>
        <p>CAT: {{ project.categories }}</p>
    </div>
    <span v-if="error.length">{{ error }}</span>
</div>
</template>

<script>
import ProjectsService from '../projectsService';
import projectComponent from './projectComponent.vue'
import mobileBioComponent from './mobileBioComponent.vue'

export default {
    name: 'ProjectDetail',
    props: ['id'],
    data(){
        return {
        project: {},
        error: ''
        }
    },
    created(){
        try {
        ProjectsService.getProjectById(this.id).then(e => this.project = e)
        } catch (err) {
        this.error = err.message;
        }
    },
}
</script>