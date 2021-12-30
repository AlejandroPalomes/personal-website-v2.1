<template>
<div>
  <div class="projects__filters d-flex flex-column justify-content-center align-items-center">
    <div class="projects__filters__categories d-flex justify-content-center align-items-center">
      <Button
        v-bind:key="category.name"
        v-for="(category) in categories"
        :active="selectedCategory === category.ID"
        @click="onChangeCategory(category.ID)"
      >
        {{category.name}}
      </Button>
    </div>
    <Searcher
      v-if="selectedCategory === 1"
      placeholder="Add a technology"
      :onInputChange="onChangeTechInput"
      :options="filteredTechnologies"
      :onSelect="onSelectTech"
    />
  </div>
  <Content :category="selectedCategory" :technologies="selectedTechnologies"/>
</div>
</template>

<script>
import { API } from '../../lib/network/API';
import Button from '../../components/button/Button.vue';
import Card from '../../components/card/Card.vue';
import Content from './components/ProjectsContent.vue';
import Searcher from '../../components/searcher/Searcher.vue';
import { Routes } from '../../router/routes/Routes';

export default {
  name: 'Projects',
  components: {
    Card,
    Button,
    Content,
    Searcher
  },
  props: ['category'],
  data(){
    return {
      categories: [],
      technologies: [],
      filteredTechnologies: [],
      selectedCategory: Number(this.$route.query.category),
      selectedTechnologies: this.$route.query.technologies?.split(',').map(Number) || [],
      error: '',
      Routes
    }
  },
  created() {
    try {
      API.categories.getAll()
        .then(APICategories => this.categories = APICategories);
      API.technologies.getAll()
        .then(APITechnologies => this.technologies = APITechnologies)
        .then(APITechnologies => this.filteredTechnologies = APITechnologies.filter(tech => !this.selectedTechnologies.includes(tech.ID)));
    } catch (err) {
      this.error = err.message;
    }
  },
  renderTriggered() {
    console.log('rendered parent');
  },
  methods: {
    onChangeCategory: function (categoryId) {
      const isNewCategory = categoryId !== this.selectedCategory;
      const path = !isNewCategory ? Routes.PROJECTS.path : Routes.PROJECTS.withParams(categoryId);
      this.$router.push(path);
      this.selectedCategory = isNewCategory ? categoryId : undefined;
    },
    onChangeTechInput: function ({ target }) {
      this.filteredTechnologies = this.technologies.filter(tech => tech.name.toLowerCase().includes(target.value) && !this.selectedTechnologies.includes(tech.ID))
    },
    onSelectTech: function(technology) {
      this.selectedTechnologies = [...this.selectedTechnologies, technology.ID];
      this.filteredTechnologies = this.filteredTechnologies.filter(tech => tech.ID !== technology.ID)
      const path = Routes.PROJECTS.withParams(this.selectedCategory, this.selectedTechnologies);
      this.$router.push(path);
    }
  }
}
</script>
