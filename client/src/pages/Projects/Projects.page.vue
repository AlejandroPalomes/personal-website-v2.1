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
    <div class="dropdown">
      <input
        v-if="selectedCategory === 1"
        class="dropdown-toggle projects__filters__technologies"
        placeholder="Add a technology"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        @keyup="onChangeTechInput"
      />
      <ul v-show="Boolean(filteredTechnologies.length)" class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li
          v-bind:key="tech.name"
          v-for="(tech) in filteredTechnologies"
        ><span class="dropdown-item">{{tech.name}}</span></li>
      </ul>
    </div>
  </div>
  <Content :category="selectedCategory"/>
</div>
</template>

<script>
import { API } from '../../lib/network/API';
import Button from '../../components/button/Button.vue';
import Card from '../../components/card/Card.vue';
import Content from './components/ProjectsContent.vue';
import { Routes } from '../../router/routes/Routes';

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
      technologies: [],
      filteredTechnologies: [],
      selectedCategory: Number(this.$route.query.category),
      error: '',
      Routes
    }
  },
  created() {
    try {
      API.categories.getAll().then(APICategories => this.categories = APICategories).then(e => console.log(e));
      API.technologies.getAll().then(APITechnologies => this.technologies = APITechnologies).then(e => this.filteredTechnologies = e);
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    onChangeCategory: function (categoryId) {
      const isNewCategory = categoryId !== this.selectedCategory;
      const path = !isNewCategory ? Routes.PROJECTS.path : Routes.PROJECTS.withParams(categoryId);
      this.$router.push(path);
      this.selectedCategory = isNewCategory ? categoryId : undefined;
    },
    onChangeTechInput: function ({ target }) {
      this.filteredTechnologies = this.technologies.filter(tech => tech.name.toLowerCase().includes(target.value))
      console.log(this.filteredTechnologies.length);
    }
  }
}
</script>
