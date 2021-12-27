<template>
<div>
  <div class="projects__filters d-flex justify-content-center align-items-center">
    <Button
      v-bind:key="category.name"
      v-for="(category) in categories"
      :active="false"
      @click="$router.push(Routes.PROJECTS.withParams(category.ID))"
    >
      {{category.name}}
    </Button>
  </div>
  <Content :category="this.$route.query.category"/>
</div>
</template>

<script>
import { API } from '../../lib/network/API';
import config from '../../lib/Config.ts';
import Button from '../../components/button/Button.vue';
import Card from '../../components/card/Card.vue';
import Content from './components/ProjectsContent.vue';
import { Routes } from '../../router/routes/Routes';
// import CarouselComponent from './CarouselComponent.vue'

export default {
    name: 'Projects',
    components: {
        Card,
        Button,
        Content
    },
    props: ['category'],
    data(){
        return {
        categories: [],
        error: '',
        Routes
        }
    },
    created() {
        try {
            API.categories.getAll().then(APICategories => this.categories = APICategories).then(e => console.log(e));
        } catch (err) {
          this.error = err.message;
        }
    }
}
</script>
