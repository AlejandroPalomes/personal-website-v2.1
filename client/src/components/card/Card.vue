<template>
    <div class="card" style="width: 18rem;">
      <!-- <img :src="project.image" class="card-img-top" alt="..."> -->
      <img :src="image" class="card-img-top" :alt="`${title} image`">
      <div class="card-body">
        <p class="card-title">{{title}}</p>
        <p class="card-text">{{body}}</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: ['project', 'title', 'body', 'image'],
    }
</script>
