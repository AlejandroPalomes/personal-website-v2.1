<template>
<div>
    <span>Hello</span>
    <h3>{{id}}</h3>
    <span>{{ project }}</span>
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