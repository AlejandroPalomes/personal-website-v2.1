<template>
<div class="project d-flex border border-danger">
    <div class="project__category d-none d-xl-flex flex-column align-items-center">
        <div class="pt-5 sticky-top">
            <span class="project__category__name">{{project.categories[0]}}</span>
            <a @click="$router.go(-1)" class="d-flex align-items-center justify-content-center animated-arrow">
                <span class="arrow__main">
                    <span class="the-arrow -left">
                        <span class="shaft"></span>
                    </span>
                    <span class="arrow__text">Back</span>
                </span>
                <span class="the-arrow -right">
                    <span class="shaft"></span>
                </span>
            </a>
        </div>
    </div>
    <div class="project__information mx-5 pt-5">
        <h4>{{ project.title }}</h4>
        <p>DESCRIPTION: {{ project.description }}</p>
        <p>COLLAB: {{ project.collaborators }}</p>
        <p>COMPLETED: {{ project.completion_date }}</p>
        <p>REPO: {{ project.repo }}</p>
        <p>PREVIEW: {{ project.preview }}</p>
        <p>TECH: {{ project.technologies }}</p>
        <p>CAT: {{ project.categories }}</p>
        <h4>{{ project.title }}</h4>
        <p>DESCRIPTION: {{ project.description }}</p>
        <p>COLLAB: {{ project.collaborators }}</p>
        <p>COMPLETED: {{ project.completion_date }}</p>
        <p>REPO: {{ project.repo }}</p>
        <p>PREVIEW: {{ project.preview }}</p>
        <p>TECH: {{ project.technologies }}</p>
        <p>CAT: {{ project.categories }}</p>
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