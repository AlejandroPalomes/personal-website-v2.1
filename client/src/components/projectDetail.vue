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
            <img class="mb-5 project__information__image" :src="`https://res.cloudinary.com/hcqy9e1vc/image/upload/v1604369233/projects/covers/project-${project.ID}.png`" :alt="`${project.title} cover`">
            <!-- <CarouselComponent v-bind:imagesArray="[]"/> -->
            <div class="mt-5 mb-4 project__information__title">
                <h4 class="project__information__title--title">{{ project.title }}</h4>
                <span class="project__information__title--date">{{ project.completion_date }}</span>
            </div>
            <div class="project__information__body">
                <!-- <p>{{ project.description }}</p> -->
                <p>Bacon ipsum dolor amet bacon pork chop alcatra burgdoggen frankfurter. Prosciutto tail shankle buffalo salami short loin turkey landjaeger fatback sirloin ground round tongue. Boudin pork venison bresaola cupim pig, capicola prosciutto ham. Hamburger landjaeger strip steak picanha shankle. Buffalo ribeye cupim, meatloaf flank cow t-bone pork beef tail jerky hamburger sirloin. Kevin strip steak drumstick pork loin doner kielbasa. Meatball hamburger short ribs, ribeye ground round biltong bacon shankle.

Salami rump kielbasa beef ribs cupim. Fatback corned beef sirloin ground round pork belly, rump shankle. Pancetta shank beef ribs, rump pork chop pork belly corned beef salami frankfurter. Alcatra cupim pig corned beef sausage ground round sirloin, drumstick doner spare ribs shank frankfurter tri-tip pork salami. Ham pork loin bacon, spare ribs kevin landjaeger meatball pastrami shank salami jerky filet mignon. Ball tip doner jerky short loin drumstick. Cow pastrami turducken brisket andouille strip steak frankfurter porchetta kevin sausage buffalo.</p>
                <p v-if="project.collaborators">COLLAB: {{ project.collaborators }}</p>
                <p>REPO: {{ project.repo }}</p>
                <p>PREVIEW: {{ project.preview }}</p>
                <p class="project__information__body--tech">
                    <span v-bind:key="project.ID + '-' + tech +'-Tech'" v-for="(tech, index) in project.technologies" >{{tech}}
                        <span v-if="(index + 1) !== project.technologies.length"> | </span>
                    </span>
                </p>
            </div>
        </div>
    </div>
    <span v-if="error.length">{{ error }}</span>
</div>
</template>

<script>
import ProjectsService from '../projectsService';
import { API } from '../lib/network/API';
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
    created() {
        try {
            // API.projects.getById(this.id).then(e => this.project = e);
            ProjectsService.getProjectById(this.id).then(e => this.project = e)
        } catch (err) {
            this.error = err.message;
        }
    },
}
</script>