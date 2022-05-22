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
    <span
      v-for="(technology) in selectedTechnologies"
      v-bind:key='technology.ID'
      class="projects__filters__technology"
      @click="onRemoveTech(technology.ID)"
      >
        {{technology.name}}
      </span>
  </div>
  <ProjectsContent :category="selectedCategory" :technologies="selectedTechnologies"/>
</div>
</template>

<script>
import { API } from '../../lib/network/API';
import Button from '../../components/button/Button.vue';
import Card from '../../components/card/Card.vue';
import ProjectsContent from './components/ProjectsContent.vue';
import Searcher from '../../components/searcher/Searcher.vue';
import { Routes } from '../../router/routes/Routes';

export default {
  name: 'Projects',
  components: {
    Card,
    Button,
    ProjectsContent,
    Searcher
  },
  props: ['category'],
  data(){
    return {
      categories: [],
      technologies: [],
      filteredTechnologies: [],
      selectedCategory: Number(this.$route.query.category),
      selectedTechnologies: [],
      error: '',
      Routes
    }
  },
  watch: {
    technologies(newData, oldData) {
      if (newData.length) {
        this.selectedTechnologies = this.getTechnologiesFromURL();
      }
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
    getTechnologiesFromURL: function () {
      const technologiesIds = this.$route.query.technologies?.split(',').map(Number) || [];
      if (this.technologies) {
        return this.technologies?.filter(technology => technologiesIds?.includes(technology.ID));
      }
      return [];
    },
    getTechnologiesIds: function () {
      // return [];
      return this.selectedTechnologies?.map(item => item.ID);
    },
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
      this.selectedTechnologies = [...this.selectedTechnologies, technology];
      this.filteredTechnologies = this.filteredTechnologies.filter(tech => tech.ID !== technology.ID)
      const ids = getTechnologiesIds();
      const path = Routes.PROJECTS.withParams(this.selectedCategory, ids);
      this.$router.push(path);
    },
    onRemoveTech: function(removingId) {
      this.selectedTechnologies = this.selectedTechnologies.filter(technologyId => technologyId !== removingId);
      // this.filteredTechnologies = this.filteredTechnologies.filter(tech => tech.ID !== technology.ID)
      const path = Routes.PROJECTS.withParams(this.selectedCategory, this.selectedTechnologies);
      this.$router.push(path);
    }
  }
}
</script>
