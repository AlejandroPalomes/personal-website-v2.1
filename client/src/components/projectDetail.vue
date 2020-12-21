<template>
<div class="project d-flex w-100">
    <div class="project__category mb-5 d-none d-xl-flex flex-column align-items-center">
        <div class="pt-5 sticky-top">
            <!-- <span class="project__category__name">{{project.categories[0]}}</span> -->
            <span class="project__category__name">dev</span>
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
    <div class="project__information mx-5 pt-5 flex-grow-1">
        <div class="mx-auto project__information__container">
            <!-- <div> -->
            <img class="mb-5 project__information__image" :src="`https://res.cloudinary.com/hcqy9e1vc/image/upload/v1604369233/projects/covers/project-${project.ID}.png`" :alt="`${project.title} cover`">
            <!-- </div> -->
            <!-- <CarouselComponent v-bind:imagesArray="[]"/> -->
            <h4 class="mt-5 mb-4 project__information__title">{{ project.title }}</h4>
            <div class="project__information__body">
                <p>{{ project.description }}</p>
                <!-- <p>COLLAB: {{ project.collaborators }}</p> -->
                <p>COMPLETED: {{ project.completion_date }}</p>
                <p>REPO: {{ project.repo }}</p>
                <p>PREVIEW: {{ project.preview }}</p>
                <p class="project__information__body--tech">TECH: {{ project.technologies }}</p>
                <p>CAT: {{ project.categories }}</p>
            </div>
        </div>
    </div>
    <span v-if="error.length">{{ error }}</span>
</div>
</template>

<script>
import ProjectsService from '../projectsService';
// import CarouselComponent from './CarouselComponent.vue'

export default {
    name: 'ProjectDetail',
    props: ['id'],
    components: {
        // CarouselComponent,
    },
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